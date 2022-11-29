const db = require('../db');

module.exports = {
    getAll: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM usuario
                INNER JOIN cargo ON cargo.id = usuario.cargo_id
                INNER JOIN instituicao ON instituicao.id_instituicao = usuario.instituicao_id`, (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

    getById: (email) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query(`SELECT * FROM usuario
            INNER JOIN cargo ON cargo.id = usuario.cargo_id
            INNER JOIN instituicao ON instituicao.id_instituicao = usuario.instituicao_id WHERE email =?`, [email], (error, results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },

    addUser: (email, hashedPassword, nome, cargo, instituicao, adm) =>{
        return new Promise(async (aceito, rejeitado)=>{
    

            db.query('INSERT INTO usuario (email,senha,nome,cargo_id, instituicao_id, adm_geral) VALUES(?,?,?,?,?,?)', 
                [email, hashedPassword, nome, cargo, instituicao, adm], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
              
                }
            );  
        });
    },

    updateUser: (email, senha, nome, cargo, instituicao, adm) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE usuario SET email = ?, senha = ?, nome = ?, cargo_id = ?, instituicao_id = ?, adm_geral = ? WHERE email = ?', 
                [email, senha, nome, cargo, instituicao, adm, email], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
              
                }
            );
        });
    },
    delUser: (email)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM usuario WHERE email=?', [email], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },


    login: (email) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT email, senha, nome FROM usuario WHERE email=?', [email], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            })
        })
    }


   

};