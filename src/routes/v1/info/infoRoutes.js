const express = require('express');
const { InfoController } = require('../../../controllers');
const router = express.Router();

router.get('/healthCheck', InfoController.info)

module.exports = router;