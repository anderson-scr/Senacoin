const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
	cpf: {type: String, required: true, minLength: 11, maxLength: 11},
	matricula: String,
	nome: {type: String, required: true},
	apelido: String,
	email: {type: String, required: true, lowercase: true},
	hash: {type: String, required: true},
	salt: {type: String, required: true},
	telefone: String,
	data_nasc: Date,
	id_status: mongoose.SchemaTypes.ObjectId, //.populate("id_status")
	id_perfil: mongoose.SchemaTypes.ObjectId, //.populate("id_perfil")
	id_unidade: mongoose.SchemaTypes.ObjectId, //.populate("id_unidade")
});
mongoose.model('Usuario', UsuarioSchema);


const StatusSchema = new mongoose.Schema({
	nome: {type: String, required: true},
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
	itens: {type: Boolean, default: false},
	relatorios: {type: Boolean, default: false},
	admin: {type: Boolean, default: false},
	gerencia: {type: Boolean, default: false},
	id_status: mongoose.SchemaTypes.ObjectId, //.populate("id_status")
	id_perfil: mongoose.SchemaTypes.ObjectId, //.populate("id_perfil")
});
mongoose.model('Perfil', PerfilSchema);


const EnderecoSchema = new mongoose.Schema({
	cidade: {type: String, required: true},
	uf: {type: String, required: true},
	logradouro: String,
	numero: Number
});
mongoose.model('Endereco', EnderecoSchema);


const UnidadeSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	endereco: EnderecoSchema,
	telefone: String,
	resposavel: {type: String, required: true},
	id_status: mongoose.SchemaTypes.ObjectId //.populate("id_status")
});
mongoose.model('Unidade', UnidadeSchema);


const AreaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	observacao: String,
	id_status: mongoose.SchemaTypes.ObjectId //.populate("id_status")
});
mongoose.model('Area', AreaSchema);


const CategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	observacao: String,
	id_status: mongoose.SchemaTypes.ObjectId //.populate("id_status")
});
mongoose.model('Categoria', CategoriaSchema);


const SubCategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	observacao: String,
	id_status: mongoose.SchemaTypes.ObjectId //.populate("id_status")
});
mongoose.model('SubCategoria', SubCategoriaSchema);


const ItemSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	observacao: String,
	pontos: {type: Number, required: true},
	imagem: String,
	data_inicio: {type: Date, immutable: true, default: () => Date.now()},
	data_fim: Date,
	id_area: mongoose.SchemaTypes.ObjectId,
	id_categoria: mongoose.SchemaTypes.ObjectId,
	id_subcategoria: mongoose.SchemaTypes.ObjectId,
	id_status: mongoose.SchemaTypes.ObjectId,
	id_unidade: mongoose.SchemaTypes.ObjectId
});
mongoose.model('Item', ItemSchema);