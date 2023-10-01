const express = require("express");
const router = express.Router();
const RepairsController = require("../controllers/repairsController.js");

// obtere la lista de motos por reparar
router.get("/", RepairsController.getPendingRepairs);
// obtener moto pendiente a reparar por id
router.get("/:id", RepairsController.getRepairById);
// crear una nueva cita para reparacion
router.post("/", RepairsController.getRepairById);
//actualizar el estado de una reparacion
router.patch("/:id", RepairsController.completeRepair);
//cancelar una reparacion cambiadno estado
router.delete("/:id", RepairsController.cancelRepair);

module.exports = router;
