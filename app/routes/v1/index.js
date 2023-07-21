const express = require('express');
const router = express.Router();
// Routes
const userRoutes = require('./userRoutes');
const operationRoutes = require('./operationRoutes');
const recordRoutes = require('./recordRoutes');

// Mount the routes
router.use('/users', userRoutes);
router.use('/operations', operationRoutes);
router.use('/records', recordRoutes);

module.exports = router;