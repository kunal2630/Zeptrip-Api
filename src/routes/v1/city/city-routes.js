const router = require('express').Router();
const { CityController } = require('../../../controllers');
const { CityMiddleware } = require('../../../middlewares');
router.get('/', CityController.getAllCity);
router.get('/:id', CityController.getCity);
router.post('/', CityMiddleware.validateAddCityRequest, CityController.addCity);
router.patch('/:id', CityMiddleware.validateUpdateCityRequest, CityController.updateCity);
router.delete('/:id', CityMiddleware.validateDeleteCityRequest, CityController.deleteCity);

module.exports = router;