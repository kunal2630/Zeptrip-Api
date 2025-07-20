const express = require('express');
const { InfoController } = require('../../../controllers');
const router = express.Router();

//http://localhost:3000/api/v1/info/healthCheck - Complete path
router.get('/healthCheck', InfoController.info)

module.exports = router;