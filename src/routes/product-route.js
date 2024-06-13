'use strict';

const express = require('express');
const router = express.Router();

//http://localhost:3000/products
router.post('/', (req, res, next)=>{
    res.status(201).send(req.body);
    console.log(req.body)
});

//http://localhost:3000/products/id
router.put('/:id', (req, res, next)=>{
    const id = req.params.id;
    res.status(200).send({
        id:id,
        item: req.body
    });

});

//http://localhost:3000/products
router.delete('/', (req, res, next)=>{
    res.status(200).send(req.body);
});

module.exports = router;