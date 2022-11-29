require("dotenv").config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT;



const routes = require("./routes");
const server = express();
server.use(bodyParser.json())
server.use(cors());
server.use('/upload', express.static('upload'));
server.use(bodyParser.urlencoded({extended: false}));



server.use('/api', routes);

server.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
})
