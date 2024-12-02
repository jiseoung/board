const express = require('express');

const router = express.Router();

const index_controllers= require('../controllers/index.controllers.js');

router.use('/', index_controllers);

module.exports = router;
