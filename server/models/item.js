const mongoose = require('mongoose');

exports.ItemSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	pontos: {type: Number, min: 0, default: 0},
	quantidade: {type: Number, min: 0, required: true},
	imagem: {type: String, default: null},
	data_inicio: {type: Date, required: false},
	data_fim: {type: Date, required: false},
	id_area: {type: mongoose.Types.ObjectId, ref: "Area", required: true},
	id_categoria: {type: mongoose.Types.ObjectId, ref: "Categoria", required: true},
	id_subcategoria: {type: mongoose.Types.ObjectId, ref: "SubCategoria", required: true},
	id_unidade: [{type: mongoose.Types.ObjectId, ref: "Unidade", required: true}],
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true}
}, { versionKey: false });