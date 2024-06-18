'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try{
        var data = await repository.get();
        res.status(200).send(data);
    }catch(e){
        res.status(500),send({
            message: 'Falha ao precessar sua requisição'
        });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await  repository.getBySlug(req.params.slug);
        res.status(200).send(data);    
    } catch (e) {
        res.status(500),send({
            message: 'Falha ao precessar sua requisição'
        });
    }    
};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.Id); 
        res.status(200).send(data);        
    } catch (e) {
        res.status(500),send({
            message: 'Falha ao precessar sua requisição'
        });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data); 
    } catch (e) {
        res.status(500),send({
            message: 'Falha ao precessar sua requisição'
        }); 
    }    
};

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slog deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A description deve conter pelo menos 3 caracteres');
    try {
        //Se os dados forem inváçidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end;
            return;
        }
        await repository.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (e) {
        res.status(500), send({
            message: 'Falha ao precessar sua requisição'
        });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({message: 'Produto atualizado com sucesso!'});
    } catch (e) {
        res.status(500), send({
            message: 'Falha ao precessar sua requisição'
        });
    } 
};

exports.delete = async(req, res, next) => {
    try{
       await repository.delete(req.body.id);
       res.status(200).send({message: 'Produto atualizado com sucesso!'});
    }
    catch(e){
        res.status(500), send({
            message: 'Falha ao precessar sua requisição',
            data: e
        });
    }
};