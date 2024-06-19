'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, index: true, unique: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true },
    tags: [{ type: String, required: true }]
});

module.exports = mongoose.model('Product', ProductSchema);
