'use strict'

const config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridkey);

exports.send = async (to, subject, body) => {
    const msg = {
        to: to,
        from: 'nsggerson@gmail.com', // Use o email verificado no SendGrid
        subject: subject,
        html: body
    };

    try {
        await sgMail.send(msg);
        console.log('Email enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.body);
        }
    }
};
