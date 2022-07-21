const mongoose = require('mongoose');

exports.EstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", required: true},
	quantidade: {type: Number, min: 0, default: 0},
}, { versionKey: false });

exports.HistoricoEstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", required: true},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
	quantidade: {type: Number, min: 0, required: true},
	operacao: {type: Boolean, required: true} // 1 entrada e 0 saida
}, { versionKey: false });
