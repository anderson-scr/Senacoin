const mongoose = require('mongoose');

exports.TransacaoSchema = new mongoose.Schema({
	responsavel: {type: String, immutable: true, default: null}, // colaborador responsavel pela liberação.
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno", required: true, immutable: true},
	id_senacoin: [{type: mongoose.Types.ObjectId, ref: "SenaCoin", required: true, immutable: true}], // lote dos senacoins utilizados
	pontos: {type: Number, min: 0, required: true, immutable: true}, // total de pontos gastos (soma dos lotes) ou ganhos
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4
	tipo: {type: Number, min: 0, max: 1,required: true, immutable: true},  // 1 entrada e 0 saida
	
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", default: null, immutable: true},
	id_qrcode: {type: mongoose.Types.ObjectId, ref: "QrCode", default: null, immutable: true},
	id_promocao: {type: mongoose.Types.ObjectId, ref: "Promocao", default: null, immutable: true}, // promocao utilizada (bonus de ganho de pontos), deve ser inserido automatico pela controladora
}, { versionKey: false });