const mongoose = require('mongoose');

exports.TransacaoSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno", required: true},
	id_senacoin: {type: mongoose.Types.ObjectId, ref: "SenaCoin", required: true},
	
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", default: null}, // quantidade gerada pela compra é igual a quantidade gasta para comprar?
	id_qrcode: {type: mongoose.Types.ObjectId, ref: "QrCode", default: null},
	id_promocao: {type: mongoose.Types.ObjectId, ref: "Promocao", default: null},
	
	tipo: {type: Boolean, required: true},  // 1 entrada e 0 saida
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
}, { versionKey: false });