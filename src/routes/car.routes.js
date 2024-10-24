// backend/src/routes/car.routes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
} = require('../controllers/car.controller');

const router = express.Router();

// Get all cars
router.get('/', getAllCars);

// Create a new car
router.post(
  '/',
  [
    check('make').notEmpty().withMessage('Make is required'),
    check('model').notEmpty().withMessage('Model is required'),
    check('color').notEmpty().withMessage('Color is required'),
    check('registrationNo')
      .notEmpty()
      .withMessage('Registration number is required'),
    check('category').notEmpty().withMessage('Category ID is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createCar
);

// Update a car
router.put(
  '/:id',
  [
    check('make').notEmpty().withMessage('Make is required'),
    check('model').notEmpty().withMessage('Model is required'),
    check('color').notEmpty().withMessage('Color is required'),
    check('registrationNo')
      .notEmpty()
      .withMessage('Registration number is required'),
    check('category').notEmpty().withMessage('Category ID is required'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateCar
);

// Delete a car
router.delete('/:id', deleteCar);

module.exports = router;
