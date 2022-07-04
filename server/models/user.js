const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	cpf: {type: String, required: true, minLenght: 11},
	matricula: String,
	nome: {type: String, required: true},
	apelido: String,
	email: {type: String, required: true, lowercase: true},
	hash: String,
	salt: String,
	telefone: String,
	data_nasc: Date,
	id_status: mongoose.SchemaTypes.ObjectId, //.populate("id_status")
	id_perfil: mongoose.SchemaTypes.ObjectId, //.populate("id_perfil")
	id_unidade: mongoose.SchemaTypes.ObjectId, //.populate("id_unidade")
});
mongoose.model('User', UserSchema);

const StatusSchema = new mongoose.Schema({
	nome: String
});
mongoose.model('Status', StatusSchema);

const PerfilSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	perfil: {type: Boolean, default: false},
	areas: {type: Boolean, default: false},
	categorias: {type: Boolean, default: false},
	subcategorias: {type: Boolean, default: false},
	usuarios: {type: Boolean, default: false},
	promocoes: {type: Boolean, default: false},
	unidades: {type: Boolean, default: false},
	produtos: {type: Boolean, default: false},
	relatorios: {type: Boolean, default: false},
	admin: {type: Boolean, default: false},
	gerencia: {type: Boolean, default: false},
	id_status: mongoose.SchemaTypes.ObjectId, //.populate("id_status")
	id_perfil: mongoose.SchemaTypes.ObjectId, //.populate("id_perfil")
});
mongoose.model('Perfil', PerfilSchema);