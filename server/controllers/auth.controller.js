const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber
    });

    // Generate token
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(201).json({
      success: true,
      token,
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password'
      });
    }

    // Generate token
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Get token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to get access'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user no longer exists'
      });
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Please log in to get access'
    });
  }
}; 