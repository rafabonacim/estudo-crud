const fs =require('fs');
const path = require('path');
const {uuid} =require('uuidv4');

const servicesPath =path.join('services.json');
let services =fs.readFileSync(servicesPath,{encoding:'utf-8'});
services =JSON.parse(services);

const adminController = {
    show:(req,res) => {
        return res.render('listaServicos', {title: 'Lista de Serviços',services})
    },
    delete:(req,res) => {
        let {id} = req.params;
        let serviceFound = services.findIndex(service => service.id == id);
        services.splice(serviceFound,1);

        let dadosJson= JSON.stringify(services);
        fs.writeFileSync(servicesPath,dadosJson);
        
        return res.redirect('/admin/listaServicos');
    },
    add:(req,res) => {
        return res.render('adicionarServico', {title: 'Adicionar Serviços'})
    },
    save:(req,res) => {
        let{nomeServico, precoServico, descricaoServico} = req.body

        let ilustracaoServico = req.file.filename;

        services.push({id: uuid(), nomeServico, precoServico, descricaoServico, ilustracaoServico});

        let dadosJson= JSON.stringify(services);

        fs.writeFileSync(servicesPath,dadosJson);

        return res.redirect('/admin/listaServicos')
    },
    edit:(req,res) => {
        let {id} = req.params;
        let serviceFound = services.find(service => service.id == id);
        return res.render('editarServico', {title: 'Editar Serviços', service: serviceFound});
    },
    update:(req,res) => {
        let {id} = req.params;
        let{nomeServico, precoServico, descricaoServico} = req.body;
        let serviceFound = services.find(service => service.id == id);
        serviceFound.nomeServico = nomeServico;
        serviceFound.precoServico = precoServico;
        serviceFound.descricaoServico = descricaoServico;

        if(req.file){
            serviceFound.ilustracaoServico = req.file.filename; 
        }

        let dadosJson= JSON.stringify(services);
        fs.writeFileSync(servicesPath,dadosJson);
        return res.redirect('/admin/listaServicos')

    }
}

module.exports =adminController;