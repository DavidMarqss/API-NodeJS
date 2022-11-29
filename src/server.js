require("dotenv").config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;



const routes = require("./routes");
const server = express();
server.use(bodyParser.json())
server.use(cors());
server.use('/upload', express.static('upload'));
server.use(bodyParser.urlencoded({extended: false}));



server.use('/api', routes);

server.listen(PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})
