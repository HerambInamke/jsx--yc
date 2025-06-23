// Platform/service fee utility

function calculatePlatformFee(amount) {
  const percentFee = amount * 0.05;
  return Math.max(Math.round(percentFee), 20); // Minimum ₹20
}

module.exports = { calculatePlatformFee }; 