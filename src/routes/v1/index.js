const express = require('express');
const router = express.Router();
const infoRoutes = require('./info/infoRoutes');
const airplaneRoutes = require('./airplane/airplane-routes');
const cityRoutes = require('./city/city-routes');

router.use('/info', infoRoutes);
router.use('/airplanes', airplaneRoutes);
router.use('/city', cityRoutes)
module.exports = router;