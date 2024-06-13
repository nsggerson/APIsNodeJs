//Força o java script a ser mais criterioso
'use strict'

//console.log('Sobre tudo o que se deve guardar, guarda o seu coração...');

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');
const { parse } = require('path');
const { CONNREFUSED } = require('dns');
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
server.on('error', onError);
server.on('Listening', onListening);

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

function onError(error){
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind= typeof port === 'string' ?
    'Pipe' + port:
    'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);            
            break;
        case 'EADDRINUSE':
            console.error('bind', 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(params) {
   const addr = server.address();
   const bind = typeof addr === 'string'
   ? 'pipe' + addr
   : 'port' + addr.port;
   debug('Listening on' + bind); 
}
console.log('API rodando na porta '+port);
