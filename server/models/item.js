const mongoose = require('mongoose');

exports.ItemSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	pontos: {type: Number, min: 0, default: 0},
	quantidade: {type: Number, min: 0, default: null}, // somente produto
	horas: {type: Number, default: null}, // exceto produto
	imagem: {type: String, default: null},
	id_area: {type: mongoose.Types.ObjectId, ref: "Area", required: true},
	id_categoria: {type: mongoose.Types.ObjectId, ref: "Categoria", required: true},
	id_subcategoria: {type: mongoose.Types.ObjectId, ref: "SubCategoria", required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	ativo: {type: Boolean, default: true}
}, { versionKey: false });

exports.AuditoriaItemSchema = new mongoose.Schema({
	colaborador: {type: String, immutable: true},
	data: {type: Date, immutable: true, default: () => Date.now() - 4*60*60*1000}, //fuso horario gmt-4,

	nome: {type: String, immutable: true},
	descricao: {type: String, immutable: true},
	pontos: {type: Number, immutable: true},
	quantidade: {type: Number, immutable: true},
	horas: {type: Number, immutable: true},
	imagem: {type: String, immutable: true},
	id_area: {type: mongoose.Types.ObjectId, ref: "Area", immutable: true},
	id_categoria: {type: mongoose.Types.ObjectId, ref: "Categoria", immutable: true},
	id_subcategoria: {type: mongoose.Types.ObjectId, ref: "SubCategoria", immutable: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", immutable: true}],
	ativo: {type: Boolean, immutable: true}
}, { versionKey: false });