const mongoose = require('mongoose');

exports.SubCategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: {type: String, default: null},
	id_status: {type: mongoose.Types.ObjectId, ref: "Status", required: true} //.populate("id_status")
}, { versionKey: false });