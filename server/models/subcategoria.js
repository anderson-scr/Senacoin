const mongoose = require('mongoose');

exports.SubCategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true} //.populate("id_status")
}, { versionKey: false });

exports.AuditoriaSubCategoriaSchema = new mongoose.Schema({
	colaborador: {type:String},
	data: {type: Date, immutable: true, default: () => Date.now(Date.now()-3600*1000*4)}, //fuso horario gmt-4

	nome: {type: String, required: true},
	descricao: {type: String},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true} //.populate("id_status")
}, { versionKey: false });