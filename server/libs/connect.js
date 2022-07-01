const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.DB_STRING)
mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});

