const express = require('express');
const router = express.Router();
const infoRoutes = require('./info/infoRoutes')
router.use('/info', infoRoutes);
module.exports = router;