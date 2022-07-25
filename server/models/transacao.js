const mongoose = require('mongoose');

exports.TransacaoSchema = new mongoose.Schema({
	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno", required: true},
	id_senacoin: {type: mongoose.Types.ObjectId, ref: "SenaCoin", required: true},
	
	id_item: {type: mongoose.Types.ObjectId, ref: "Item", default: null}, // quantidade gerada pela compra é igual a quantidade gasta para comprar?
	id_qrcode: {type: mongoose.Types.ObjectId, ref: "QrCode", default: null},
	id_promocao: {type: mongoose.Types.ObjectId, ref: "Promocao", default: null},
	
	tipo: {type: Boolean, required: true},  // 1 entrada e 0 saida
	data_trans: {type: Date, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
}, { versionKey: false });

exports.AuditoriaTransacaoSchema = new mongoose.Schema({
	colaborador: {type:String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	id_aluno: {type: mongoose.Types.ObjectId, ref: "Aluno", required: true},
	id_senacoin: {type: mongoose.Types.ObjectId, ref: "SenaCoin", required: true},
	
	id_item: {type: mongoose.Types.ObjectId, ref: "Item"}, // quantidade gerada pela compra é igual a quantidade gasta para comprar?
	id_qrcode: {type: mongoose.Types.ObjectId, ref: "QrCode"},
	id_promocao: {type: mongoose.Types.ObjectId, ref: "Promocao"},
	
	tipo: {type: Boolean, required: true},  // 1 entrada e 0 saida
	data_trans: {type: Date, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4
}, { versionKey: false });