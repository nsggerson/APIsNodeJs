'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');
const autheService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};

exports.post = async (req, res, next) => {
    // Validação de dados
    const contract = new ValidationContract();
    contract.isRequired(req.body.customer, 'O cliente é obrigatório');
    contract.isRequired(req.body.items, 'Os itens são obrigatórios');
    contract.hasMinLen(req.body.items, 1, 'Deve haver pelo menos um item no pedido');


    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        //Decodificação o token
        const data = await autheService.decodeToken(token);

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });

        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            error: e.message
        });
    }
};
