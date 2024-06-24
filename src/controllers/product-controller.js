'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/product-repository');

const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');
const uuid = require('uuid');

// const azure =  require('azure-storage');
// const guid =  require('guid');
// const config = require('../config');
// const util = require('util');

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
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        // Cria o Blob Service
        const blobSvc = azure.createBlobService(config.useImageBlobcontainerConnectionString);
              
        // Obtem a imagem em base64 do corpo da requisição
        let rawdata = req.body.image;
        // Separa a hash recebida em duas partes
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        
        //Valida o fomato do arquivo
        if (!matches) {
            throw new Error('Formato de imagem inválido');
        }

        // Obtém o tipo da imagem
        let type = matches[1];
        let extension = type.split('/')[1];
        let filename = guid.raw().toString() + '.' + extension;        
         // Obtém a imagem em si
         let buffer = Buffer.from(matches[2], 'base64'); 

         // Salva a imagem
         await new Promise((resolve, reject) => {
             blobSvc.createBlockBlobFromText('container1', filename, buffer, {
                 contentType: type
             }, function (error, result, response) {
                 if (error) {
                     console.error('Erro ao criar o blob:', error);
                     filename = 'default.png';
                     return reject(error);
                 }
                 resolve(result);
             });
         });
        
        await repository.create({
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestore2.blob.core.windows.net/container1/' + filename
        });

        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
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