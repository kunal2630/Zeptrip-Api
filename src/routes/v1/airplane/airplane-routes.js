const express = require('express');
const { AirplaneController } = require('../../../controllers');
const { AirplaneMiddlewares } = require('../../../middlewares');
const router = express.Router();

router.post('/', AirplaneMiddlewares.validateAddAirplaneRequest, AirplaneController.addAirplane);

router.get('/', AirplaneController.getAllAirplane);
router.patch('/:id', AirplaneMiddlewares.validateUpdateAirplaneRequest, AirplaneController.updateAirplane);
router.get('/:id', AirplaneController.getAirplane);

router.delete('/:id', AirplaneMiddlewares.validateDeleteAirplaneRequest, AirplaneController.deleteAirplane);
module.exports = router;