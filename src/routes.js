const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('./middleware/login.js');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname)

    }
});
const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    }

});


const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const ImageController = require("./controllers/ImageController");



//Usuários----
router.get('/users', UserController.getAll);
router.get('/user/:email', UserController.getById);
router.post('/user', login.required,UserController.addUser);
router.put('/user/:email', login.required,UserController.updateUser);
router.delete('/user/:email', login.required,UserController.delUser);
router.post('/login', UserController.login);

//Eventos----
router.get('/events', EventController.getAllEvents)
router.get('/events/:id_evento', EventController.getEventById)
router.post('/events', login.required,EventController.addEvent);
router.put('/events/:id_evento', login.required,EventController.updateEvent);
router.delete('/events/:id_evento', login.required,EventController.delEvent);

//Imagens----
router.get('/images', ImageController.getAllImages);
router.get('/image/:id_imagem', ImageController.getImageById);
router.post('/image', upload.single('imagem'), login.required, ImageController.addImage);
router.put('/image/:id_imagem',   upload.single('imagem'), login.required,ImageController.updateImage);
router.delete('/image/:id_imagem', login.required,ImageController.delImage);



module.exports = router;
