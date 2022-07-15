const mongoose = require('mongoose');

exports.TransacaoSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.SchemaTypes.ObjectId, ref: "Aluno"},
	id_senacoin: {type: mongoose.SchemaTypes.ObjectId, ref: "SenaCoin"},
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	id_promocao: {type: mongoose.SchemaTypes.ObjectId, ref: "Promocao"},
});

exports.HistoricoTransacaoSchema = new mongoose.Schema({
	id_transacao: {type: mongoose.SchemaTypes.ObjectId, ref: "Transacao"},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
	tipo: Boolean
});