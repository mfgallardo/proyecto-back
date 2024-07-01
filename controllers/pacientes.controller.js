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

module.exports = {
  index,
  show,
};
