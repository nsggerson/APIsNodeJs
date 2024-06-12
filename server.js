//Força o java script a ser mais criterioso
'use strict'

//console.log('Sobre tudo o que se deve guardar, guarda o seu coração...');

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
//const { title } = require('process');

const app = express();
const port = 3000;
app.set('port',port);

const server = http.createServer(app);
const router = express.Router();

//http:/
const route = router.get('/', (req, res, next)=>{
    res.status(200).send({
        title: "Node Store API",
        versin: "0.0.1"
    });
});

app.use('/', route);
server.listen(port);

console.log('API rodando na porta '+port);