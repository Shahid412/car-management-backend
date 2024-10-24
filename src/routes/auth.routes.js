// backend/routes/auth.routes.js
const express = require('express');
const { signUp, login } = require('../controllers/auth.controller');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/signup',
  [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('name').notEmpty().withMessage('Name is required'),
  ],
  signUp
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Must be a valid email'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

module.exports = router;
