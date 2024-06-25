'use strict'

const nodemailer = require('nodemailer');
const fs = require('fs'); // Importação do módulo fs
const config = require('../config');

// Configurações do transporte SMTP (substitua com suas credenciais)
const smtp = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // deve ser false para a porta 587
  auth: {
    user: config.usernodemailer,
    pass: config.passnodemailer
  },
  tls: {
    // Adicione a opção minVersion para especificar a versão mínima do protocolo SSL/TLS
    minVersion: 'TLSv1'
  }
});

exports.sendBoasVindas = async (email, nome) => {
  
  const configEmail = {
    to: email,
    from: config.usernodemailer, // Use o email configurado
    subject: 'Bem-vindo(a) ao Node Store!',
    html: 'Sobre tudo o que se deve guardar, guarda o seu coração...' // emailBody
  };

  try {
    await smtp.sendMail(configEmail);
    console.log(`Email de boas-vindas enviado para: ${email}`);
  } catch (error) {
    console.error('Erro ao enviar email de boas-vindas:', error);
    // Incluir log do erro
  }
};
