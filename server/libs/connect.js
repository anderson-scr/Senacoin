const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => { 
    mongoose.connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};

exports.onConnection = () => {
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
} 

// If the connection throws an error
exports.onError = () => {
    mongoose.connection.on("error", (err) => {
        console.error('Failed to connect to DB' , err);
    });
} 

// When the connection is reconnected
exports.onReconnect = () => {
    mongoose.connection.on('reconnected', function() {
        console.log('Reconnected to DB');
    });
}
// When the connection is disconnected
exports.onDisconnect = () => {
    mongoose.connection.on('disconnected',  () =>{
        console.log('Database disconnected');
    });
} 

exports.disconnect = () => { 
    mongoose.connection.close( () =>{
        console.log('Database is disconnected through app termination');
        process.exit(0);
    });
}