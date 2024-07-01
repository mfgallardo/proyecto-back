// Conexión base de datos

const db = require("../db/db");

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

// Traer un resultado

/*const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM patients WHERE id = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Intente más tarde" });
    }
    res.json(rows[0]);
  });
};*/

// Crear un paciente

const store = (req, res) => {
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
    "INSERT INTO patients (name, surname, email, phone_number, date_of_birth, address, national_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, surname, email, phone_number, date_of_birth, address, national_id],
    (error, result) => {
      console.log(result);
      if (error) {
        console.error("Error al buscar paciente:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      const paciente = { ...req.body, id: result.insertId };
      res.json(paciente);
    }
  );
};

const update = (req, res) => {
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

  const sql =
    "UPDATE patients SET name = ?, surname = ?, email = ?, phone_number = ?, date_of_birth = ?, address = ?, national_id = ? WHERE patient_id = ?)";
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
      id,
    ],
    (error, result) => {
      console.log(result);
      if (error) {
        console.error("Error al buscar paciente:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "No existe el paciente" });
      }
      const paciente = { ...req.body, ...req.params };
      res.json(paciente);
    }
  );
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
