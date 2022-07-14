const mongoose = require('mongoose');

exports.AreaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	id_status: {type: mongoose.Types.ObjectId, ref: "Status"} //.populate("id_status")
});