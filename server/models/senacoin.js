const mongoose = require('mongoose');

exports.SenaCoinSchema = new mongoose.Schema({ // lote de senacoins obtidos e sua data de expiração
	data_inicio: {type: Date, required: true},
	data_fim: {type: Date, required: true},
	pontos: {type: Number, min: 0, required: true},
}, { versionKey: false });