const express = require('express');
const router = express.Router();
const productoSchema = require('../models/productos');
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth();

router.get('/productos', checkJwt, function(req, res) {
    
    productoSchema.find().then((productos) => {
        res.json(productos);
    }).catch((error) => {
        console.log('Error al obtener los productos', error);
    });                         

  });

  module.exports = router;


