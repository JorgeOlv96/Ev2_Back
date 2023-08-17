const e = require("express")
const mongoose = require("mongoose")

//crear el esquema
const pacientesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  sangre: {
    type: String,
    required: true,
  },
  idDoctor: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Paciente", pacientesSchema)
