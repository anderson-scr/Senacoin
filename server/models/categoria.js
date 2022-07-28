const mongoose = require('mongoose');

exports.CategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
}, { versionKey: false });