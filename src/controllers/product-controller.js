'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product'); // Certifique-se de que o nome do modelo está correto

exports.post = (req, res, next) =>{
    var product = new Product(req.body);
    product.save().then(x => {
        res.status(201).send({message:'Produto cadastrado com sucesso!'});
    }).catch(e =>{
        res.status(400).send({message:'Falha ao cadastrar o produto', data: e});
    });
};

exports.put = (req, res, next) =>{
    const id = req.params.id;
    res.status(200).send({
        id:id,
        message:'Aquivo alterado com sucesso!',
        item: req.body
    });
};

exports.delete = (req, res, next) =>{
    res.status(200).send({
        message:'Aquivo deletado com sucesso!',
    });
};