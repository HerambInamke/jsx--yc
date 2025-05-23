const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const config = require('../config/config');
const asyncHandler = require('express-async-handler');

const signToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN
    });
};

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber
    });

    const token = signToken(user._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        }
    });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        res.status(401);
        throw new Error('Incorrect email or password');
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        }
    });
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const allowedUpdates = ['name', 'email', 'phoneNumber', 'addresses'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        res.status(400);
        throw new Error('Invalid updates!');
    }

    const user = await User.findById(req.user.id);
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error('Please provide current password and new password');
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check if current password is correct
    if (!(await user.comparePassword(currentPassword))) {
        res.status(401);
        throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Sign new token
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        message: 'Password updated successfully'
    });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Please provide your email');
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('There is no user with that email address');
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    // Token expires in 10 minutes
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'Token sent to email',
        resetToken // In production, send this via email instead
    });
});

exports.resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    if (!password || !token) {
        res.status(400);
        throw new Error('Please provide password and reset token');
    }

    // Get user based on token
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        res.status(400);
        throw new Error('Token is invalid or has expired');
    }

    // Update password and clear reset token fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // Log the user in
    const jwtToken = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token: jwtToken,
        message: 'Password reset successful'
    });
});

exports.getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    });
});

exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.updateUser = asyncHandler(async (req, res) => {
    // Do not update password with this!
    if (req.body.password) {
        res.status(400);
        throw new Error('This route is not for password updates. Please use /updateMyPassword');
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
