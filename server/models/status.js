const mongoose = require('mongoose');

exports.StatusSchema = new mongoose.Schema({
	nome: {type: String, required: true},
}, { versionKey: false });