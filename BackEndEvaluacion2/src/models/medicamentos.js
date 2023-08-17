const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema(
    {
      nombre: {
        type: String,
        unique: true,
        maxlength: 100,
        required: true,
      },
      descripcion: {
        type: String,
        maxlength: 500,
      },
      dosisRec: {
        type: String,
        maxlength: 20,
        required: true,
      },
      efectosSec: {
        type: String,
        maxlength: 500,
      },
      contraindicaciones: {
        type: String,
        maxlength: 500,
      },
      fechaCaduc: {
        type: String,
        required: true,
      },
    }
  );
  

module.exports = mongoose.model('Medicamentos', medicineSchema);