'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product'); 

exports.get = () =>{
    return Product
        .find({
            active: true
        },'title price slug');
};

exports.getBySlug= (slug) =>{
    return Product
        .findOne({
            slug: slug,
            active: true}
            ,'title description price slug tags');
};

exports.getById = (id) =>{
    return Product
        .findOne(id);
}

exports.getByTag= (tag) =>{
    return Product
        .find({
            tags: tag, 
            active: true
        },'title description price slug tags')
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
