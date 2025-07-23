const express = require('express');
const { AirplaneController } = require('../../../controllers');
const { AirplaneMiddleware } = require('../../../middlewares');
const router = express.Router();

router.post('/', AirplaneMiddleware.validateAddAirplaneRequest, AirplaneController.addAirplane);

router.get('/', AirplaneController.getAllAirplane);
router.patch('/:id', AirplaneMiddleware.validateUpdateAirplaneRequest, AirplaneController.updateAirplane);
router.get('/:id', AirplaneController.getAirplane);

router.delete('/:id', AirplaneMiddleware.validateDeleteAirplaneRequest, AirplaneController.deleteAirplane);
module.exports = router;