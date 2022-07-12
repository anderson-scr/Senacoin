const mongoose = require('mongoose');

const SenaCoinSchema = new mongoose.Schema({
	data_inicio: Date,
	data_fim: Date,
	pontos: {type: Number, min: 0, default: 0},
});
mongoose.model("SenaCoin", SenaCoinSchema);


const CarteiraPontosSchema = new mongoose.Schema({
	id_transacao: {type: mongoose.SchemaTypes.ObjectId, ref: "Transacao"},
	saldo: Number
});
mongoose.model("CarteiraPontos", CarteiraPontosSchema);
