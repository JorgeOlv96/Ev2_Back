const express = require("express")
const app = express()
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const productoRoutes = require("./src/routes/productos")
const pacientesRoutes = require("./src/routes/pacientes")
const medicamentosRoutes = require("./src/routes/medicamentos")
const citasRoutes = require("./src/routes/citas")

const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL
const AUDIENCE = process.env.AUDIENCE

if (!ISSUER_BASE_URL || !AUDIENCE) {
  console.error(
    "Make sure you have ISSUER_BASE_URL and AUDIENCE in your .env file"
  )
  process.exit(1)
}

const corsOptions = {
  origin: "http://localhost:3000",
}

app.use(cors(corsOptions))

const checkJwt = auth()

app.use(express.json())
app.use("/api", productoRoutes)
app.use("/api", pacientesRoutes)
app.use("/api", medicamentosRoutes)
app.use("/api", citasRoutes)
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  })
})

app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message: "Hola mandare los pacientes y son Jorje y Juan",
  })
})

app.get(
  "/api/private-scoped",
  checkJwt,
  requiredScopes("read:messages"),
  function (req, res) {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    })
  }
)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" })
})

//conexion a la base de datos
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Conexion a la base de datos de atlas establecida")
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos de atlas", error)
  })

app.listen(3010, () => {
  console.log("Listening on http://localhost:3010")
})
