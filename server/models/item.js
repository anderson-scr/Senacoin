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


const HistoricoSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	data: {type: Date, immutable: true, default: () => Date.now()},
	quantidade: Number,
	operacao: Boolean //1 entrada e 0 saida
});
mongoose.model("Historico", HistoricoSchema);


const PromocaoSchema = new mongoose.Schema({
	id_item: {type: mongoose.SchemaTypes.ObjectId, ref: "Item"},
	id_unidade: {type: mongoose.SchemaTypes.ObjectId, ref: "Unidade"},
	prom_titulo: String,
	promo_descricao: String,
	promo_observacao: String,
	prom_pontos: Number,
	prom_desc: Number,
	prom_quantidade: Number,
	prom_imagem: String,
	prom_dt_inicio: Date,
	promo_dt_fim: Date,
	fk_id_status: {type: mongoose.SchemaTypes.ObjectId, ref: "Status"}
});
mongoose.model("Promocao", PromocaoSchema);