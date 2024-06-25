'use strict';

const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');

exports.uploadImage = async (base64Image) => {
    // Cria o Blob Service
    const blobSvc = azure.createBlobService(config.useImageBlobcontainerConnectionString);

    // Verifica se a imagem em base64 está definida
    if (!base64Image) {
        throw new Error('A imagem é obrigatória');
    }

    // Verifica se `base64Image` é uma string
    if (typeof base64Image !== 'string') {
        throw new Error('Formato de imagem inválido');
    }

    // Separa a hash recebida em duas partes
    let matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    // Valida o formato do arquivo
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

    return 'https://nodestore2.blob.core.windows.net/container1/' + filename;
};
