require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const pacientesRouter = require("./routes/pacientes.router");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/pacientes", pacientesRouter);
//Otra opción
//app.use("/pacientes", require("./routes/pacientes.router"));

app.use("/auth", require("./routes/auth.router"));

const corsOptions = {
  origin: "http://localhost", // Permitir solo solicitudes desde este origen
  methods: ["GET", "POST", "PUT", "DELETE"], // Permitir solo estos métodos HTTP
  allowedHeaders: ["Content-Type"], // Permitir solo estos encabezados
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hola Express!");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
