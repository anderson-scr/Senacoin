const mongoose = require('mongoose');

exports.SenaCoinSchema = new mongoose.Schema({ // lote de senacoins obtidos e sua data de expiração
	data_inicio: Date,
	data_fim: Date,
	pontos: {type: Number, min: 0, default: 0},
});