'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product'); 

exports.get = async () =>{
    const result= await Product
        .find({
            active: true
        },'title price slug');
    
    return result;
};

exports.getBySlug= async (slug) =>{
    const result = await Product
        .findOne({
            slug: slug,
            active: true}
            ,'title description price slug tags');
    
    return result;
};

exports.getById = async (id) =>{
    const result = await Product
        .findOne(id);
    return result;
}

exports.getByTag= async (tag) =>{
    const result= await  Product
        .find({
            tags: tag, 
            active: true
        },'title description price slug tags')
    return result;
};

exports.create = (data) =>{
    var product = new Product(data);
    return product.save();
};

exports.update = (id, data) =>{
    return Product
        .findByIdAndUpdate(id,{
        $set: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                price: data.price
        } 
        },{new: true});
};

exports.delete = (id) =>{
    return Product
        .findByIdAndDelete(id);    
}
