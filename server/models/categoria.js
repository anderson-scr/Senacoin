const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"} //.populate("id_status")
});
mongoose.model("Categoria", CategoriaSchema);


const SubCategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"} //.populate("id_status")
});
mongoose.model("SubCategoria", SubCategoriaSchema);
