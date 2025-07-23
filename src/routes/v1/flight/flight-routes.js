const router = require('express').Router();
const { FlightController } = require('../../../controllers');
const { FlightMiddlewares } = require('../../../middlewares');
router.get('/', FlightController.getAllFlight);
router.get('/:id', FlightController.getFlight);
// router.post('/', FlightMiddlewares.validateAddFlightRequest, FlightController.addFlight);
// router.patch('/:id', FlightMiddlewares.validateUpdateFlightRequest, FlightController.updateFlight);
// router.delete('/:id', FlightMiddlewares.validateDeleteFlightRequest, FlightController.deleteFlight);

module.exports = router;