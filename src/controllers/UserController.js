const UserService = require("../services/UserService");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
   
    getAll: async (req, res)=>{
        let json = {error:'', result:[]};

        let users = await UserService.getAll();
        if(users){
            json.result = users;
        }
        res.json(json);
    },

    getById: async(req, res) =>{
        let json = {error:'', result:{}};
        let email = req.params.email;
        let user = await UserService.getById(email);

        if(user){
            json.result = user;
        }
        res.json(json);
    },

    addUser: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let email = req.body.email;
    
        let senha = req.body.senha;
        
        let nome = req.body.nome;
        
        let cargo = req.body.cargo_id;
        
        let instituicao = req.body.instituicao_id;

        let adm = req.body.adm_geral;
        
       

        try{
            const hashedPassword = await bcrypt.hash(senha, 8)
            await UserService.addUser(email, hashedPassword, nome, cargo, instituicao, adm);
            json.result = {
                email,
                nome,
                senha,
                cargo,
                instituicao,
                adm
                
                
            };
        }catch(error){
            console.log(error)
        }
        res.json(json);
    },

    updateUser: async(req, res) =>{
        let json = {error:'', result:{}};
        
        
        let email = req.body.email;
        let senha = req.body.senha;
        let nome = req.body.nome;
        let cargo = req.body.cargo_id;
        let instituicao = req.body.instituicao_id
        let adm = req.body.adm_geral
        
        
        

       
        try{
            const hashedPassword = await bcrypt.hash(senha, 8)
            await UserService.updateUser(email, hashedPassword, nome, cargo, instituicao, adm);
            json.result = {
                email,
                senha,
                nome,
                cargo,
                instituicao,
                adm
            };
        }catch(error){
            console.log(error);
        }
        res.json(json);
    },
    delUser: async(req, res) => {
        let json = {error: '', result:{}};

        await UserService.delUser(req.params.email);
        res.json(json);
    },

    login: async(req, res) => {
        
        
        try {
            let email = req.body.email;
            let senha = req.body.senha;
            var results = await UserService.login(email);
            
    
            if (await bcrypt.compareSync(senha, results[0].senha)) {
                const token = jwt.sign({
                    nome: results[0].nome,
                    email: results[0].email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "6d"
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token
                });
            }
            return res.status(401).send({ message: 'Falha na autenticação' })
    
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Falha na autenticação' });
        }
    
    },


    

    



}