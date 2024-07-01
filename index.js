const express = require("express");
const app = express();
const pacientesRouter = require("./routes/pacientes.router");

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/pacientes", pacientesRouter);
//Otra opción
//app.use("/pacientes", require("./routes/pacientes.router"));

app.get("/", (req, res) => {
  res.send("Hola Express!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
