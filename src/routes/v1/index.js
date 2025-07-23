const express = require('express');
const router = express.Router();
const infoRoutes = require('./info/infoRoutes');
const airplaneRoutes = require('./airplane/airplane-routes');
const cityRoutes = require('./city/city-routes');
const flightRoutes = require('./flight/flight-routes');
const airportRoutes = require('./airport/airport-routes');


router.use('/info', infoRoutes);
router.use('/airplanes', airplaneRoutes);
router.use('/city', cityRoutes);
router.use('/flight', flightRoutes);
router.use('/airport', airportRoutes);


module.exports = router;