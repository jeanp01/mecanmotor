const { validationResult } = require("express-validator");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const UserController = {
  // Buscar un usuario por su correo electrónico
  findUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error("Error al buscar el usuario por correo electrónico");
    }
  },

  // Obtener lista de usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener los datos" });
    }
  },

  // Obtener usuario por ID
  getUserById: async (req, res) => {
    const user = req.foundUser;
    const { id } = req.params; // Corregido: Obtener el ID de los parámetros de la solicitud

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener el usuario" });
    }
  },

  // Crear un nuevo usuario
  createUser: async (req, res) => {
    const errors = validationResult(req);
    const { name, email, password, role } = req.body;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //verificar si existe usuario con igual id
      const existUserById = await User.findByPk(req.body.id);
      if (existUserById) {
        return res
          .status(400)
          .json({ error: "ya existe el usuario con este id" });
      }
      //verificar si existe usuario con igual correo
      const existUserByEmail = await User.findOne({ where: { email } });
      if (existUserByEmail) {
        return res
          .status(400)
          .json({ error: "el usuario con este correo ya existe " });
      }
      // si no existe y todo va bien crear el nuevo usuario
      const newUser = await User.create({
        name,
        email,
        password,
        role,
        status: true,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Error al crear el usuario" });
    }
  },

  // Actualizar los datos de un usuario
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      user.name = name;
      user.email = email;
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Error al actualizar el usuario" });
    }
  },

  // Deshabilitar la cuenta
  disableUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      user.status = false; // Cambia el estado a "false" para deshabilitar la cuenta
      await user.save();

      return res
        .status(200)
        .json({ message: "Cuenta de usuario deshabilitada" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error al deshabilitar la cuenta de usuario" });
    }
  },

  //Usuario exista por id
  validateUserById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      req.foundUser = user;
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error en la validación del usuario" });
    }
  },
};

module.exports = UserController;
