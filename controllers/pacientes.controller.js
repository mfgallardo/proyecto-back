// Conexión base de datos

const db = require("../db/db");

const fs = require("fs");
const path = require("path");

// Traer todos los resultados

const index = (req, res) => {
  const sql = "SELECT * FROM patients";
  db.query(sql, (error, rows) => {
    // console.log(rows);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    res.json(rows);
  });
};

// Traer un resultado

const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM patients WHERE patient_id = ?";
  db.query(sql, [id], (error, rows) => {
    if (error) {
      console.error("Error al buscar paciente:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }
    res.json(rows[0]);
  });
};

// Crear un paciente

const store = (req, res) => {
  console.log(req.file);

  const { filename } = req.file;
  const {
    name,
    surname,
    email,
    phone_number,
    date_of_birth,
    address,
    national_id,
  } = req.body;

  const sql =
    "INSERT INTO patients (name, surname, email, phone_number, date_of_birth, address, national_id, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      surname,
      email,
      phone_number,
      date_of_birth,
      address,
      national_id,
      filename,
    ],
    (error, result) => {
      console.log(result);
      if (error) {
        console.error("Error al buscar paciente:", error);
        fs.unlinkSync(path.join(__dirname, "./uploads", filename));
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      const paciente = { ...req.body, id: result.insertId };
      res.json(paciente);
    }
  );
};

// Modificar datos de un paciente

const update = (req, res) => {
  console.log(req.file);

  let sql =
    "UPDATE patients SET name = ?, surname = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ?, national_id = ? WHERE patient_id = ?";

  const { id } = req.params;
  const {
    name,
    surname,
    email,
    phone_number,
    date_of_birth,
    address,
    national_id,
  } = req.body;

  const values = [
    name,
    surname,
    email,
    phone_number,
    date_of_birth,
    address,
    national_id,
  ];

  if (req.file) {
    const { filename } = req.file;
    sql =
      "UPDATE patients SET name = ?, surname = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ?, national_id = ?, image = ? WHERE patient_id = ?";
    values.push(filename);
  }

  values.push(id);

  db.query(sql, values, (error, result) => {
    // console.log(result);
    if (error) {
      console.error("Error al buscar paciente:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No existe el paciente" });
    }

    if (result.affectedRows === 1) {
      // fs.unlink
    }
    const paciente = { ...req.body, ...req.params };
    res.json(paciente);
  });
};

// Borrar un paciente

const destroy = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM patients WHERE patient_id = ?";
  db.query(sql, [id], (error, result) => {
    console.log(result);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No existe el paciente" });
    }
    res.json({ message: "Registro borrado" });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
