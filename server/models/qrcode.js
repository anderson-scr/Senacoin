const mongoose = require('mongoose');

const QrCodeSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	id_usuario: {type: mongoose.SchemaTypes.ObjectId, ref: "Usuario"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	titulo: String,
	descricao: String,
	url: String,
	data_inicio: Date,
	data_fim: Date,
	id_senacoin: {type: mongoose.SchemaTypes.ObjectId, ref: "SenaCoin"},
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}

});
mongoose.model("QrCode", QrCodeSchema);
