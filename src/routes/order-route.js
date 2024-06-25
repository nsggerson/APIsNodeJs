'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller'); 
const authorizeService = require('../services/auth-service');

router.get('/',authorizeService.authorize, controller.get);
router.post('/',authorizeService.authorize, controller.post);



module.exports = router;