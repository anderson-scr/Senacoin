const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	observacao: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"} //.populate("id_status")
});
mongoose.model("Area", AreaSchema);


const CategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	observacao: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"} //.populate("id_status")
});
mongoose.model("Categoria", CategoriaSchema);


const SubCategoriaSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	observacao: String,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"} //.populate("id_status")
});
mongoose.model("SubCategoria", SubCategoriaSchema);


const ItemSchema = new mongoose.Schema({
	nome: {type: String, required: true},
	descricao: String,
	observacao: String,
	pontos: {type: Number, required: true},
	imagem: String,
	data_inicio: {type: Date, immutable: true, default: () => Date.now()},
	data_fim: Date,
	id_area: {type: mongoose.SchemaTypes.ObjectId, ref: "Area"},
	id_categoria: {type: mongoose.SchemaTypes.ObjectId, ref: "Categoria"},
	id_subcategoria: {type: mongoose.SchemaTypes.ObjectId, ref: "SubCategoria"},
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"}
});
mongoose.model("Item", ItemSchema);


const EstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	quantidade: Number
});
mongoose.model("Estoque", EstoqueSchema);


const HistoricoEstoqueSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	data: {type: Date, immutable: true, default: () => Date.now()},
	quantidade: Number,
	operacao: Boolean //1 entrada e 0 saida
});
mongoose.model("HistoricoEstoque", HistoricoEstoqueSchema);


const PromocaoSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	titulo: String,
	descricao: String,
	observacao: String,
	pontos: Number,
	desconto: Number,
	quantidade: Number,
	imagem: String,
	data_inicio: Date,
	data_fim: Date,
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}
});
mongoose.model("Promocao", PromocaoSchema);


const SenaCoinSchema = new mongoose.Schema({
	data_inicio: Date,
	data_fim: Date,
	pontos: {type: Number, min: 0, default: 0},
});
mongoose.model("SenaCoin", SenaCoinSchema);


const QrCodeSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	id_usuario: {type: mongoose.SchemaTypes.ObjectId, ref: "Usuario"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	titulo: String,
	descricao: String,
	observacao: String,
	imagem: String,
	link: String,
	img_link: String, //qual a dif dos dois?
	data_inicio: Date,
	data_fim: Date,
	id_senacoin: {type: mongoose.SchemaTypes.ObjectId, ref: "SenaCoin"},
	id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}

});
mongoose.model("QrCode", QrCodeSchema);



// CREATE TABLE `carteira_digital` (
// 	`id_carteira` int(11) NOT NULL,
// 	`fk_id_transacao` int(11) NOT NULL,
// 	`cd_saldo` float NOT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


// CREATE TABLE `transacao` (
//   `id_transacao` int(11) NOT NULL,
//   `fk_cpf` varchar(11) NOT NULL,
//   `fk_id_senacoin` int(11) NOT NULL,
//   `fk_id_item` int(11) DEFAULT NULL,
//   `fk_id_promocao` int(11) DEFAULT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

// CREATE TABLE `extrato` (
// 	`fk_id_transacao` int(11) NOT NULL,
// 	`ext_data` datetime NOT NULL DEFAULT current_timestamp(),
// 	`ext_tipo` tinyint(1) NOT NULL
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
