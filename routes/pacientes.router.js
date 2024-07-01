const express = require("express");
const router = express.Router();

const pacientes = [
  { id: 1, nombre: "Maria", apellido: "Gomez" },
  { id: 2, nombre: "Juan", apellido: "Lopez" },
  { id: 3, nombre: "Marta", apellido: "Gonzalez" },
  { id: 4, nombre: "Matias", apellido: "Perez" },
];

// GET
router.get("/", (req, res) => {
  res.json(pacientes);
});

// GET /pacientes/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const paciente = pacientes.find((elemento) => elemento.id == parseInt(id));
  if (!paciente) {
    return res.status(404).json({ error: "No se encontró el paciente" });
  }
  res.send(paciente);
});

// POST
router.post("/", (req, res) => {
  console.log("Request body:", req.body); // Agregado para depuración

  const id = pacientes[pacientes.length - 1].id + 1;

  const nuevoPaciente = {
    id: id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
  };

  pacientes.push(nuevoPaciente);
  console.log("Paciente agregado:", nuevoPaciente); // Agregado para depuración

  res.status(201).json(nuevoPaciente);
});

// PUT /pacientes/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const paciente = pacientes.find((elemento) => elemento.id == id);
  if (!paciente) {
    return res.status(404).json({ error: "No se encontró el paciente" });
  }

  paciente.nombre = nombre;

  res.json(paciente);
});

// DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const paciente = pacientes.find((elemento) => elemento.id == id);
  if (!paciente) {
    return res.status(404).json({ error: "No se encontró el paciente" });
  }

  const pacienteIndex = pacientes.findIndex((elemento) => elemento.id == id);
  pacientes.splice(pacienteIndex, 1);

  res.send(paciente);
});

module.exports = router;
