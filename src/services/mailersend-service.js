const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

const mailerSend = new MailerSend({
    apiKey: sendgridkey,
});

const send = async (to = 'nsggerson@gmail.com', subject = 'Teste de api', body = 'Sobre tudo o que se deve guardar, guarda o seu coração...') => {
    const recipients = [new Recipient(to, to)]; // Aqui você pode ajustar o segundo parâmetro para ser o nome do destinatário, se necessário

    const emailParams = new EmailParams()
        .setFrom(new Sender('nsggerson@gmail.com', 'Gerson')) // Remetente com o nome
        .setTo(recipients)
        .setSubject(subject)
        .setHtml(body);
    try {
        await mailerSend.email.send(emailParams);
        console.log('Email enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        if (error.response) {
            console.error('Detalhes do erro:', error.response.body);
        }
    }
};

// module.exports = { send };

// // Chama a função send para teste
// send();
