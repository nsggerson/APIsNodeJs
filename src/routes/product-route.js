'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller'); 
const authorizeService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.get('/admin/:id', controller.getById);


router.post('/', authorizeService.authorize, controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;