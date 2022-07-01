const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

//salva o caminho para a raiz do projeto
global.__basedir = __dirname;

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./libs/connect');


//config parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Allows our Angular application to make HTTP requests to Express application
app.use(cors());

//arq estaticos
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(__dirname +'public/uploads/'));

//upload de arquivos
//app.use(fileUpload());

//importa todas as rotas
app.use(require('./routes'));

app.listen(port, () => console.log(`Servidor escutando a porta http://localhost:${port}`));