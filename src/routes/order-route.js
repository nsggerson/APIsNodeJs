'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller'); 
const autheService = require('../services/auth-service');

router.get('/',autheService.authorize, controller.get);
router.post('/',autheService.authorize, controller.post);



module.exports = router;