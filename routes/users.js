const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const User = require("../models/User.js");

//obtener la lista de usuarios
router.get("/", UserController.getAllUsers);
//Obtener usuario por id
router.get("/:id", UserController.getUserById);
//crear un nuevo usuario
router.post("/", UserController.createUser);
//actualizar los datos de usuario
router.patch("/:id", UserController.updateUser);
//deshabilidar cuenta
router.delete("/:id", UserController.disableUser);

router.delete("/:id", UserController.createUser);

module.exports = router;
