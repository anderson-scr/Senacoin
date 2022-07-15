const mongoose = require('mongoose');

exports.TransacaoSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno"},
	id_senacoin: {type: mongoose.Types.ObjectId, ref: "SenaCoin"},
	id_item: {type: mongoose.Types.ObjectId, ref: "Item"},
	id_promocao: {type: mongoose.Types.ObjectId, ref: "Promocao"},
});

exports.HistoricoTransacaoSchema = new mongoose.Schema({
	id_transacao: {type: mongoose.Types.ObjectId, ref: "Transacao"},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
	tipo: Boolean
});