const express = require('express');
const router = express.Router();
const infoRoutes = require('./info/infoRoutes')
const airplaneRoutes = require('./airplane/airplane-routes')


router.use('/airplanes', airplaneRoutes);

router.use('/info', infoRoutes);
module.exports = router;