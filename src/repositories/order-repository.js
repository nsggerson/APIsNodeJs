'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Product = mongoose.model('Product');

exports.get = async () => {
    try {
        const result = await Order.find({},'number status')
            .populate('customer','name')
            .populate('items.quantity items.product','title price');
        return result;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error; // Lança o erro para ser tratado pela controller
    }
};

exports.create = async (data) => {
    try {
        // Atualize os itens com o preço do produto
        const updatedItems = await Promise.all(data.items.map(async item => {
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Produto com ID ${item.product} não encontrado`);
            }
            return {
                quantity: item.quantity,
                price: product.price, // Obtém o preço do produto do banco de dados
                product: item.product
            };
        }));

        const orderData = {
            customer: data.customer,
            number: data.number,
            items: updatedItems
        };

        const order = new Order(orderData);
        return await order.save();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Lança o erro para ser tratado pela controller
    }
};
