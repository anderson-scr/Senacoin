const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"} //.populate("id_status")
});
mongoose.model("Area", AreaSchema);