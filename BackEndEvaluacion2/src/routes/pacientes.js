const express = require('express');
const router = express.Router();
const pacientesSchema = require('../models/pacientes');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth();

//crear un nuevo paciente
router.post('/paciente', checkJwt, function(req, res) {
    const paciente = pacientesSchema(req.body);

    paciente.save().then((paciente) => {
        res.json(paciente);
    }).catch((error) => {
        console.log('Error al guardar el paciente', error);
    });

});

// obtener todos los pacientes
router.post('/pacientes', checkJwt, function(req, res) {
    const { idDoctor } = req.body;
    pacientesSchema.find({ idDoctor: idDoctor }).then((pacientes) => {
        res.json(pacientes);
    }).catch((error) => {
        console.log('Error al obtener los pacientes', error);
    });                         
  });

// obtener un paciente por id
router.get('/paciente/:id', checkJwt, function(req, res) {

    pacientesSchema.findById(req.params.id).then((paciente) => {
        res.json(paciente);
    }).catch((error) => {
        console.log('Error al obtener el paciente', error);
    });

});

// actualizar un paciente por id
router.put('/paciente/:id', checkJwt, function(req, res) {
    const { id } = req.params;
    const { name, edad, sangre } = req.body;

    pacientesSchema
        .updateOne({ _id: id }, { $set: { name, edad, sangre } })
        .then((paciente) => {
            res.json(paciente);
        }).catch((error) => {
            console.log('Error al actualizar el paciente', error);
        });

});

// eliminar un paciente por id
router.delete('/paciente/:id', checkJwt, function(req, res) {

    pacientesSchema.findByIdAndRemove(req.params.id).then((paciente) => {
        res.json(paciente);
    }).catch((error) => {
        console.log('Error al eliminar el paciente', error);
    });

});

  module.exports = router;


