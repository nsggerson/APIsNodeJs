//Força o java script a ser mais criterioso
'use strict'

//console.log('Sobre tudo o que se deve guardar, guarda o seu coração...');

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const { parse } = require('path');
//const { title } = require('process');

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

const server = http.createServer(app);
const router = express.Router();

//http://localhost:3000
const route = router.get('/', (req, res, next)=>{
    res.status(200).send({
        title: "Node Store API",
        versin: "0.0.1"
    });
});

app.use('/', route);
server.listen(port);

//Função normalize procura uma porta disponível se não hover pega a  3000
function normalizePort(val){
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if(port >= 0){
        return port;
    }
    return false;
}

console.log('API rodando na porta '+port);
