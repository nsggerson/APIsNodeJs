'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller'); 
const autheService = require('../services/auth-service');

router.get('/', controller.get);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate); 
router.post('/refresh-token',authorizeService.authorize, controller.refreshToken);

module.exports = router;