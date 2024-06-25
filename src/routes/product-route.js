'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller'); 
const autheService = require('../services/auth-service');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.get('/admin/:id', controller.getById);


router.post('/', autheService.isAdmin, controller.post);
router.put('/:id',autheService.isAdmin, controller.put);
router.delete('/',autheService.isAdmin, controller.delete);

module.exports = router;