const express = require('express');
const Card = require('../models/creditcard');
var router = express.Router();
const Cardmodule = require('../models/creditcard');

// rutas
router.get('/credit', (req, res) => {
    res.render('pages/brand/CardAddEdit', {
        viewTitle: "Add or Update date form Card"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    insertCard(req, res)
    else
    updateCard(req, res)
});





//metodos para insertar y actualizar
function insertCard(req, res){
    var card = new Cardmodule();
    card.tipo_tarjeta = req.body.tipo_tarjeta;
    card.nombre_titular = req.body.nombre_titular;
    card.numero_tarjeta = req.body.numero_tarjeta;
    card.fecha_expiracion = req.body.fecha_expiracion;
    card.codigo_seguridad =req.body.codigo_seguridad;
    card.save(e => {
        if(!e)
        res.redirect('brand/brandList');
        else
        console.log("Error", e);
    });
}


//modificar los registros ya creados

function updateCard(req, res){
    Card.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) => {
        if(!err){
            res.render('brand/brandList', {
                viewTitle: "Actualizar los datos de una tarjeta",
                brand: req.body
            })
        } else {
            console.log("Error", err);
        }
    });
}



//imprimir los datos de la BD en la vista de LISTBRANDS
router.get('/brandList', (req, res) => {
    Card.find((error, docs) => {
        if(!error){
            res.render("pages/brand/brandList", {
                viewTitle: "Tarjetas agregadas",
                list: docs
            })
        } else {
            console.log("Error", error);
        }
    });
})






router.get('/:id', (req, res) => {
    Card.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('pages/brand/CardAddEdit', {
                viewTitle: "Actualizar los datos de una tarjeta.",
                card: doc
            });
        }
    });
});





router.get('/delete/:id', (req, res) => {
    Card.findByIdAndRemove(req.params.id, (err) => {
        if(!err){
            res.redirect('/brand/brandList');
        } else {
            console.log("Error", err);
        }
    });
})

module.exports = router;
