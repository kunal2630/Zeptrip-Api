const express = require('express');
const { AirportController } = require('../../../controllers');
const { AirportMiddleware } = require('../../../middlewares');
const router = express.Router();

router.get('/', AirportController.getAllAirport);
router.get('/:id', AirportController.getAirport);
router.post('/', AirportMiddleware.validateAddAirportRequest, AirportController.addAirport);
router.patch('/:id', AirportMiddleware.validateUpdateAirportRequest, AirportController.updateAirport);
router.delete('/:id', AirportMiddleware.validateDeleteAirportRequest, AirportController.deleteAirport);
module.exports = router;