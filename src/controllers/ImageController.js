const ImageService = require("../services/ImageService");
module.exports = {
    getAllImages: async (req, res)=>{
        let json = {error:'', result:[]};

        let images = await ImageService.getAllImages();
        if(images){
            json.result = images;
        }
        res.json(json);
    },

    getImageById: async(req, res) =>{
        let json = {error:'', result:{}};
        let id_imagem = req.params.id_imagem;
        let image = await ImageService.getImageById(id_imagem);

        if(image){
            json.result = image;
        }
        res.json(json);
    },

    addImage: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id = req.body.id_imagem;
    
        let link = req.file.path;
        
        let nome = req.file.originalname;
        
        let tipo = req.file.mimetype;
        
        let evento = req.body.evento_id_evento;

        let instituicao = req.body.evento_instituicao_id_instituicao;     
        
       
        
        

       
        try{
            await ImageService.addImage(id, link, nome, tipo, evento, instituicao);
            json.result = {
                id,
                link,
                nome,
                tipo,
                evento,
                instituicao
                
                
            };
        }catch(error){
            console.log(error)
        }
        res.json(json);
    },

    updateImage: async(req, res) =>{
        let json = {error:'', result:{}};
        
        let id = req.body.id_imagem;
    
        let link = req.file.path;
        
        let nome = req.file.originalname;
        
        let tipo = req.file.mimetype;
        
        let evento = req.body.evento_id_evento;

        let instituicao = req.body.evento_instituicao_id_instituicao;    
        
        
        

       
        try{
            await ImageService.updateImage(id, link, nome, tipo, evento, instituicao);
            json.result = {
                id,
                link,
                nome,
                tipo,
                evento,
                instituicao
            };
        }catch(error){
            console.log(error);
        }
        res.json(json);
    },

    delImage: async(req, res) => {
        let json = {error: '', result:{}};

        await ImageService.delImage(req.params.id_imagem);
        res.json(json);
    },

}