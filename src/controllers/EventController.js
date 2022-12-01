const EventService = require("../services/EventService");
module.exports = {
    getAllEvents: async (req, res)=>{
        let json = {error:'', result:[]};

        let events = await EventService.getAllEvents();
        if(events){
            json.result = events;
        }
        res.json(json);
    },

    getEventById: async(req, res) =>{
        let json = {error:'', result:{}};
        let id_evento = req.params.id_evento;
        let event = await EventService.getEventById(id_evento);

        if(event){
            json.result = event;
        }
        res.json(json);
    },
    
    addEvent: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id = req.body.id_evento;
            
        let nome = req.body.nome;
        
        let descricao = req.body.descricao;
        
        let instituicao = req.body.instituicao_id_instituicao;

        let lugar = req.body.lugar_id_lugar;     
        
        let tipo = req.body.fk_id_tipo;
    
        let data_inicio = req.body.data_inicio;

        let data_fim = req.body.data_fim;

        let hora_inicio = req.body.hora_inicio;
        
        let hora_fim = req.body.hora_fim;
        

       
        try{
            await EventService.addEvent(id, nome, descricao, instituicao, lugar, tipo, data_inicio, data_fim, hora_inicio, hora_fim);
            json.result = {
                id,
                nome,
                data_inicio,
                data_fim,
                hora_inicio,
                hora_fim,
                descricao,
                instituicao,
                lugar,
                tipo
                
                
            };
        }catch(error){
            console.log(error)
        }
        res.json(json);
    },

    updateEvent: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id = req.body.id_evento;
        
        let nome = req.body.nome;
        
        let descricao = req.body.descricao;
        
        let instituicao = req.body.instituicao_id_instituicao;

        let lugar = req.body.lugar_id_lugar; 
        
        let tipo = req.body.fk_id_tipo;

        let data_inicio = req.body.data_inicio;

        let data_fim = req.body.data_fim;

        let hora_inicio = req.body.hora_inicio;
        
        let hora_fim = req.body.hora_fim;
        
        
        

       
        try{
            await EventService.updateEvent(id, nome, descricao, instituicao, lugar, tipo, data_inicio, data_fim, hora_inicio, hora_fim);
            json.result = {
                id,
                nome,
                data_inicio,
                data_fim,
                hora_inicio,
                hora_fim,
                descricao,
                instituicao,
                lugar,
                tipo
            };
        }catch(error){
            console.log(error);
        }
        res.json(json);
    },

    delEvent: async(req, res) => {
        let json = {error: '', result:{}};

        await EventService.delEvent(req.params.id_evento);
        res.json(json);
    },
};
   