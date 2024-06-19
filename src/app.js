'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

mongoose.connect('mongodb+srv://nsggerson:jp1d51Z36wgtFxt6@cluster0.nfe72rg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const app = express();
const router = express.Router();
//Carregando os models
const Product = require('./models/product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');

//Carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;