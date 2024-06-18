'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/customer-repository');

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

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'Email inválido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 6 caracteres');
    try {
        //Se os dados forem inváçidos
        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end;
            return;
        }
        await repository.create(req.body);
        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
    } catch (e) {
        res.status(500), send({
            message: 'Falha ao precessar sua requisição'
        });
    }
};
