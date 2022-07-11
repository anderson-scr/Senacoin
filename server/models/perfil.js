const mongoose = require('mongoose');

const PerfilSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	perfil: {type: Boolean, default: false},
	areas: {type: Boolean, default: false},
	categorias: {type: Boolean, default: false},
	subcategorias: {type: Boolean, default: false},
	usuarios: {type: Boolean, default: false},
	promocoes: {type: Boolean, default: false},
	unidades: {type: Boolean, default: false},
	itens: {type: Boolean, default: false},
	relatorios: {type: Boolean, default: false},
	admin: {type: Boolean, default: false},
	gerencia: {type: Boolean, default: false},
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}, //.populate("id_status")
});
mongoose.model("Perfil", PerfilSchema);