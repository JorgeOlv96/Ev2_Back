const express = require("express")
const router = express.Router()
const citasSchema = require("../models/citas")
const { auth } = require("express-oauth2-jwt-bearer")

const checkJwt = auth()

router.post("/citas", checkJwt, function (req, res) {
  const cita = citasSchema(req.body)
  cita
    .save()
    .then((cita) => {
      res.status(201).json(cita)
    })
    .catch((e) => {
      console.log("Error al guardar la cita", e)
      res.status(500).json({ error: e })
    })
})

router.get("/citas", checkJwt, (req, res) => {
  const doctorId = req.query.idDoctor // Use req.query to access query parameters

  citasSchema
    .find({ doctor: doctorId })
    .populate("paciente")
    .then((citas) => {
      res.status(200).json(citas)
    })
    .catch((e) => {
      console.log("Error al obtener las citas", e)
      res.status(500).json({ error: e })
    })
})

router.get("/citas/:id", checkJwt, (req, res) => {
  citasSchema
    .findById(req.params.id)
    .then((cita) => {
      res.json(cita)
    })
    .catch((e) => {
      console.log("Error al obtener la cita", e)
      res.status(500).json({ error: e })
    })
})

router.put("/citas/:id", checkJwt, (req, res) => {
  const { id } = req.params
  let { fecha, hora, motivo, paciente } = req.body

  citasSchema
    .updateOne({ _id: id }, { $set: { fecha, hora, motivo, paciente } })
    .then((cita) => {
      res.json(cita)
    })
    .catch((e) => {
      console.log("Error al actualizar la cita", e)
      res.status(500).json({ error: e })
    })
})

router.delete("/citas/:id", checkJwt, (req, res) => {
  const { id } = req.params
  citasSchema
    .findByIdAndRemove(id)
    .then((cita) => {
      res.status(204).json(cita)
    })
    .catch((e) => {
      console.log("Error al eliminar la cita", e)
      res.status(500).json({ error: e })
    })
})

module.exports = router
