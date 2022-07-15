const mongoose = require('mongoose');

exports.EstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.Types.ObjectId, ref: "Item"},
	quantidade: Number
});


exports.HistoricoEstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.Types.ObjectId, ref: "Item"},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
	quantidade: Number,
	operacao: Boolean //1 entrada e 0 saida
});
