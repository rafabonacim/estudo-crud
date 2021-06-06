const express = require('express');//chama o modulo express
const multer = require('multer');
const path = require('path')
const router = express.Router();
const adminController = require('../controllers/adminControllers')

/*config do multer*/
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join('uploads'));
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage:storage });

//listar serviços
router.get('/listaServicos', adminController.show);
//lista e deleta serviços 
router.delete('/listaServicos/deletar/:id', adminController.delete);
//adicionar serviços
router.get('/listaServicos/adicionar', adminController.add);
router.post('/listaServicos/adicionar', upload.single('ilustracaoServico'), adminController.save);

//editar serviços
router.get('/listaServicos/editar/:id', adminController.edit);
router.put('/listaServicos/editar/:id', upload.single('ilustracaoServico'), adminController.update);


module.exports = router;