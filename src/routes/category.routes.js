// backend/src/routes/category.routes.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category.controller');

const router = express.Router();

// Get all categories
router.get('/', getAllCategories);

// Create a new category
router.post(
  '/',
  [check('name').notEmpty().withMessage('Category name is required')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createCategory
);

// Update a category
router.put(
  '/:id',
  [check('name').notEmpty().withMessage('Category name is required')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateCategory
);

// Delete a category
router.delete('/:id', deleteCategory);

module.exports = router;
