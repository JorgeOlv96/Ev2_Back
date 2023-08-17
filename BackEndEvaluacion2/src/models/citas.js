const mongoose = require("mongoose")
// const DateOnly = require("mongoose-dateonly")(mongoose)
const citasSchema = mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
})

module.exports = mongoose.model("Citas", citasSchema)
