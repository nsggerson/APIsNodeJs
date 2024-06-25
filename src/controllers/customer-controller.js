'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const nodemailer = require('../services/nodemailer-service'); // Importando o service
const fs = require('fs'); // Para leitura do template (opcional)
const autheService = require('../services/auth-service');

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
  contract.isEmail(req.body.email, 'Email inválido');
  contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres');

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    // Envio do email de boas-vindas
    await nodemailer.sendBoasVindas(req.body.email, req.body.name);

    res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar sua requisição:', error);
    // Incluir log do erro
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

   
    if (!customer) {
      res.status(404).send({
        message:"Usuário ou senha inválido!"
      });
      return;
    }

    const token = await autheService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name
    });
    
    res.status(201).send({
      token: token,
      data:{
        email: customer.email,
        name: customer.name
      }
    });
  } catch (error) {
    console.error('Erro ao processar sua requisição:', error);
    // Incluir log do erro
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

   
    if (!customer) {
      res.status(404).send({
        message:"Usuário ou senha inválido!"
      });
      return;
    }

    const token = await autheService.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name
    });
    
    res.status(201).send({
      token: token,
      data:{
        email: customer.email,
        name: customer.name
      }
    });
  } catch (error) {
    console.error('Erro ao processar sua requisição:', error);
    // Incluir log do erro
    res.status(500).send({ message: 'Falha ao processar sua requisição' });
  }
};
