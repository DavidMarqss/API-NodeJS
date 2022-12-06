const db = require('../db');

module.exports = {
    getAllEvents: ()=>{
        return new Promise((aceito, rejeitado)=>{
            db.query(`SELECT * FROM evento 
            INNER JOIN tipo_evento ON tipo_evento.id_tipo = evento.fk_id_tipo 
            INNER JOIN instituicao ON instituicao.id_instituicao = evento.instituicao_id_instituicao
            INNER JOIN lugar ON lugar.id_lugar = evento.lugar_id_lugar ORDER BY id_evento`, (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },

    getEventById: (id_evento) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query(`SELECT * FROM evento 
            INNER JOIN tipo_evento ON tipo_evento.id_tipo = evento.fk_id_tipo 
            INNER JOIN instituicao ON instituicao.id_instituicao = evento.instituicao_id_instituicao
            INNER JOIN lugar ON lugar.id_lugar = evento.lugar_id_lugar WHERE id_evento =?`, [id_evento], (error, results)=>{
                if(error) { rejeitado(error); return;}
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },

    addEvent: (id_evento, nome, descricao, instituicao_id_instituicao, lugar_id_lugar, fk_id_tipo, data_inicio, data_fim, hora_inicio, hora_fim) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO evento (id_evento,nome,descricao, instituicao_id_instituicao, lugar_id_lugar, fk_id_tipo,data_inicio,data_fim,hora_inicio,hora_fim ) VALUES(?,?,?,?,?,?,?,?,?,?)', 
                [id_evento, nome, descricao, instituicao_id_instituicao, lugar_id_lugar, fk_id_tipo, data_inicio, data_fim, hora_inicio, hora_fim], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
              
                }
            );  
        });
    },

    updateEvent: (id_evento,nome, descricao, instituicao_id_instituicao, lugar_id_lugar, fk_id_tipo, data_inicio, data_fim, hora_inicio, hora_fim) =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE evento SET nome = ?, descricao = ?, instituicao_id_instituicao = ?, lugar_id_lugar = ?, fk_id_tipo = ?, data_inicio = ?, data_fim = ?, hora_inicio =?, hora_fim = ?  WHERE id_evento = ?', 
                [nome, descricao, instituicao_id_instituicao, lugar_id_lugar, fk_id_tipo, data_inicio, data_fim, hora_inicio, hora_fim, id_evento], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
              
                }
            );
        });
    },

    delEvent: (id_evento)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('DELETE FROM evento WHERE id_evento=?', [id_evento], (error, results)=>{
                if(error) { rejeitado(error); return;}
                aceito(results);
            });
        })
    },
};