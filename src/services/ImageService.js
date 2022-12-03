const db = require('../db');

module.exports = {
    getAllImages: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM imagem 
            INNER JOIN (SELECT id_evento, nome FROM evento ) AS e ON e.id_evento = imagem.evento_id_evento
            INNER JOIN instituicao ON instituicao.id_instituicao = imagem.evento_instituicao_id_instituicao ORDER BY id_imagem`, (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

    getImageById: (id_imagem) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query(`SELECT * FROM imagem 
            INNER JOIN (SELECT id_evento, nome FROM evento ) AS e ON e.id_evento = imagem.evento_id_evento
            INNER JOIN instituicao ON instituicao.id_instituicao = imagem.evento_instituicao_id_instituicao WHERE id_imagem =?`, [id_imagem], (error, results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },

    addImage: (id_imagem, link, nome, tipo, evento_id_evento,evento_instituicao_id_instituicao) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO imagem (id_imagem,link,nome_img,tipo,evento_id_evento,evento_instituicao_id_instituicao) VALUES(?,?,?,?,?,?)', 
                [id_imagem, link, nome, tipo, evento_id_evento, evento_instituicao_id_instituicao], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
              
                }
            );  
        });
    },

    updateImage: (id_imagem, link, nome, tipo, evento_id_evento,evento_instituicao_id_instituicao) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE imagem SET id_imagem = ?, link = ?, nome_img = ?, tipo = ?, evento_id_evento = ?, evento_instituicao_id_instituicao = ? WHERE id_imagem = ?', 
                [id_imagem, link, nome, tipo, evento_id_evento, evento_instituicao_id_instituicao, id_imagem], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
              
                }
            );
        });
    },

    delImage: (id_imagem)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM imagem WHERE id_imagem=?', [id_imagem], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

}