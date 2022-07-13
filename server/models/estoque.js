const mongoose = require('mongoose');

exports.EstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	quantidade: Number
});


exports.HistoricoEstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	data: {type: Date, immutable: true, default: () => Date.now()},
	quantidade: Number,
	operacao: Boolean //1 entrada e 0 saida
});
