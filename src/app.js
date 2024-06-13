'use strict';

const express = require('express');

const app = express();
const router = express.Router();

//http://localhost:3000
const route = router.get('/', (req, res, next)=>{
    res.status(200).send({
        title: "Node Store API",
        versin: "0.0.1"
    });
});

app.use('/', route);
console.log('APP Carregado...');
module.exports = app;