const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;

    // Verifica tipo de archivo
    const mimetype = fileTypes.test(file.mimetype);

    // Verifica la extensión del archivo
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("No es un archivo permitido");
  },

  // Define tamaño máximo de archivo
  limits: { fileSize: 1024 * 1024 * 1 },
});

const controller = require("../controllers/pacientes.controller");

// GET
router.get("/", controller.index);

// GET un elemento
router.get("/:id", controller.show);

// POST
router.post("/", upload.single("image"), controller.store);

// PUT /pacientes/:id
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.destroy);

module.exports = router;
