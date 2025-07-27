const router = require('express').Router();
const { FlightController } = require('../../../controllers');
const { FlightMiddleware } = require('../../../middlewares');
router.get('/', FlightController.getAllFlight);
router.get('/:id', FlightController.getFlight);
router.post('/', FlightMiddleware.validateAddFlightRequest, FlightController.addFlight);
router.patch('/:id', FlightMiddleware.validateUpdateFlightRequest, FlightController.updateFlight);
// router.delete('/:id', FlightMiddlewares.validateDeleteFlightRequest, FlightController.deleteFlight);

module.exports = router;