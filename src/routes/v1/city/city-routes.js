const router = require('express').Router();
const { CityController } = require('../../../controllers');
const { CityMiddlewares } = require('../../../middlewares');
router.get('/', CityController.getAllCity);
router.get('/:id', CityController.getCity);
router.post('/', CityMiddlewares.validateAddCityRequest, CityController.addCity);
router.patch('/:id', CityMiddlewares.validateUpdateCityRequest, CityController.updateCity);
router.delete('/:id', CityMiddlewares.validateDeleteCityRequest, CityController.deleteCity);

module.exports = router;