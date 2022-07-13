const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
	nome: {type: String, required: true},
});
mongoose.model("Status", StatusSchema);
