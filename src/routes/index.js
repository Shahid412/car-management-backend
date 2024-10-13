// /routes/index.js
const express = require('express');
const authRoutes = require('./auth.routes');
const carRoutes = require('./car.routes');
const categoryRoutes = require('./category.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/cars', carRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
