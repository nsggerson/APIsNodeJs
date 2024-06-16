'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

mongoose.connect('mongodb+srv://nsggerson:jp1d51Z36wgtFxt6@cluster0.nfe72rg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const app = express();
const router = express.Router();
//Carregando os models
const Product = require('./models/Product');

//Carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;