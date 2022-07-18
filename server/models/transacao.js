const mongoose = require('mongoose');

exports.TransacaoSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno", required: true},
	id_senacoin: {type: mongoose.Types.ObjectId, ref: "SenaCoin", required: true},
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", required: true},
	id_promocao: {type: mongoose.Types.ObjectId, ref: "Promocao", required: true},
}, { versionKey: false });

exports.HistoricoTransacaoSchema = new mongoose.Schema({
	id_transacao: {type: mongoose.Types.ObjectId, ref: "Transacao", required: true},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
	tipo: {type: Boolean, required: true},
}, { versionKey: false });