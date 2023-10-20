const { validationResult } = require("express-validator");
const Repairs = require("../routes/repairs.js");

const RepairsController = {
  //obtener lista de motos por reparar
  getPendingRepairs: async (req, res) => {
    try {
      const PendingRepairs = await Repairs.findAll({
        where: { status: "pending" },
      });
      return res.status(200).json(PendingRepairs);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al obtener la lista de motos pendientes" });
    }
  },

  //obtener lista de motos por reparar por id
  getRepairById: async (req, res) => {
    const { id } = req.params;

    try {
      const repair = await Repairs.findByPk(id);

      if (!repair) {
        return res.status(404).json({ error: "reparacion no encontrada" });
      }
      return res.status(200).json(repair);
    } catch (error) {
      return res.status(500).json({ error: "error al obtener la reparacion" });
    }
  },

  // Crear una nueva cita de reparación
  createRepair: async (req, res) => {
    const { date, userId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newRepair = await Repairs.create({
        date,
        userId,
        status: "pending",
      });
      return res.status(201).json(newRepair);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "error al crear la cita de reparacion" });
    }
  },
  // Actualizar el estado de una reparación a completada
  completeRepair: async (req, res) => {
    const { id } = req.params;

    try {
      const repair = await Repairs.findByPk(id);

      if (!repair) {
        return res.status(404).json({ error: "Reparación no encontrada" });
      }

      repair.status = "completed";
      await repair.save();

      return res.status(200).json(repair);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al completar la reparación" });
    }
  },

  //cancelar una reparacion cambiando el estado
  cancelRepair: async (req, res) => {
    const { id } = req.params;

    try {
      //verificar si la reparacion ya esta en la db
      const repair = await Repairs.findByPk(id);
      if (!repair) {
        return res.status(404).json({ error: "Reparación no encontrada" });
      }

      //verificar si el estado es "completed"
      if (repair.status === "completed") {
        return res
          .status(400)
          .json({ error: "no se puede cancelar una reparacion completada" });
      }

      // Cambia el estado a "cancelled"
      repair.status = "cancelled";
      await repair.save();

      return res.status(200).json({ message: "Reparación cancelada" });
    } catch (error) {
      return res.status(500).json({ error: "Error al cancelar la reparación" });
    }
  },

  //validacion de un servicio pendiente
  validatePendingService: async (req, res, next) => {
    const { id } = req.params;

    try {
      const service = await Repairs.findByPk(id);
      if (!service) {
        return res
          .status(404)
          .json({ error: "Servicio pendiente no encontrado" });
      }
      if (service.status !== "pending") {
        return res.status(400).json({ error: "Este servicio no es pendiente" });
      }
      req.foundService = service;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error en la validacion del servicio pendiente" });
    }
  },
};

module.exports = RepairsController;
