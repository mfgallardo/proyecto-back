const express = require("express");
const router = express.Router();

const controller = require("../controllers/pacientes.controller");

// GET
router.get("/", controller.index);

// GET un elemento
router.get("/id:", controller.show);

// POST
router.post("/", controller.store);

// PUT /pacientes/:id
router.put("/:id", controller.update);

// DELETE
router.delete("/:id", controller.destroy);

module.exports = router;
