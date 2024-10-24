// backend/controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const sendEmail = require('../utils/mail.utils');
const generateRandomPassword = require('../utils/generatePassword.utils');

// Sign-up
exports.signUp = async (req, res) => {
  const { email, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const randomPassword = generateRandomPassword();
    // console.log('randomPassword:', randomPassword);
    const user = new User({ email, name, password: randomPassword });
    // console.log('user:', user);
    await user.save();
    // console.log('Creating email template...');

    // Send welcome email with the random password
    const subject = 'Welcome to Car Management System';
    const text = `Hello ${name},\n\nWelcome to the Car Management System! Your password is: ${randomPassword}\n\nPlease keep it secure.\n\nBest Regards,\nTeam`;
    await sendEmail(email, subject, text);

    res.status(201).json({
      message: 'User created successfully. A welcome email has been sent.',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error: ' + error?.message ?? JSON.stringify(error),
    });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
