'use strict';

const express = require('express');
const router = express.Router();

//http://localhost:3000/products
router.get('/', (req, res, next)=>{
    res.status(200).send({
        title: "Node Store API",
        versin: "0.0.1",
        message:"Sobre tudo o que se deve guardar, guarda o seu coração..."
    });
});

module.exports = router;