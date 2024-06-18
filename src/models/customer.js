'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true},
    active: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Customer', customerSchema);
