const express = require("express");
const router = express.Router();
const RepairsController = require("../controllers/repairsController.js");
const authorizeEmployee = require("../authMiddleware.js");
// obtere la lista de motos por reparar
router.get("/", authorizeEmployee, RepairsController.getPendingRepairs);
// obtener moto pendiente a reparar por id
router.get("/:id", authorizeEmployee, RepairsController.getRepairById);
// crear una nueva cita para reparacion
router.post("/", RepairsController.getRepairById);
//actualizar el estado de una reparacion
router.patch(
  "/:id",
  authorizeEmployee,
  RepairsController.validatePendingService,
  RepairsController.completeRepair
);
//cancelar una reparacion cambiadno estado
router.delete(
  "/:id",
  authorizeEmployee,
  RepairsController.validatePendingService,
  RepairsController.cancelRepair
);
//validacion de un servicio pendiente
router.put("/:id", RepairsController.validatePendingService);

module.exports = router;
