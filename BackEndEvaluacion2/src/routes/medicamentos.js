const express = require('express');
const router = express.Router();
const medicineSchema = require('../models/medicamentos');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth();

router.post('/medicamento', checkJwt, function(req, res) {
    const medicamento = medicineSchema(req.body);

    medicamento.save().then((medicamento) => {
        res.json(medicamento);
    }).catch((error) => {
        console.log('Error al guardar el medicamento', error);
    });

});

router.get('/medicamentos', checkJwt, function(req, res) {
    
    medicineSchema.find().then((medicamento) => {
        res.json(medicamento);
    }).catch((error) => {
        console.log('Error al obtener los medicamentos', error);
    });
  });

router.get('/medicamento/:id', checkJwt, function(req, res) {

    medicineSchema.findById(req.params.id).then((medicamento) => {
        res.json(medicamento);
    }).catch((error) => {
        console.log('Error al obtener el medicamento', error);
    });

});

router.put('/medicamento/:id', checkJwt, function(req, res) {
    const { id } = req.params;
    let { nombre, descripcion, dosisRec, efectosSec, contraindicaciones, fechaCaduc } = req.body;

    medicineSchema.updateOne({ _id: id }, 
        { $set: { nombre, descripcion, dosisRec, efectosSec, contraindicaciones, fechaCaduc } })
        .then((medicamento) => {
            res.json(medicamento);
        }).catch((error) => {
            console.log('Error al actualizar el medicamento', error);
        });

});

router.delete('/medicamento/:id', checkJwt, function(req, res) {

    medicineSchema.findByIdAndRemove(req.params.id).then((medicamento) => {
        res.json(medicamento);
    }).catch((error) => {
        console.log('Error al eliminar el medicamento', error);
    });

});

  module.exports = router;


