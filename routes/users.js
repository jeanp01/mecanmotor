const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");
const User = require("../models/User.js");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authorizeEmployee = require("../authMiddleware.js");

// Ruta de inicio de sesión
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encuentra al usuario por su correo electrónico
    const user = await UserController.findUserByEmail(email);

    // Si no se encuentra el usuario, responde con un error
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Verifica la contraseña con bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Genera un token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    } else {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error en el inicio de sesión" });
  }
});

//obtener la lista de usuarios
router.get("/", UserController.getAllUsers);
//Obtener usuario por id
router.get("/:id", UserController.getUserById);
//crear un nuevo usuario
router.post(
  "/",
  [
    //validar antes de crear usuario
    body("name").not().isEmpty().withMessage("el campo 'name' es obligatorio"),
    body("email")
      .isEmail()
      .withMessage("El campo 'email' debe ser una dirección de correo válida"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("El campo 'password' debe contener al menos 5 caracteres"),
  ],
  UserController.createUser
);
//actualizar los datos de usuario
router.patch("/:id", authorizeEmployee, UserController.updateUser);
//deshabilidar cuenta
router.delete("/:id", authorizeEmployee, UserController.disableUser);
//crear usuario
router.delete("/:id", UserController.createUser);
// usuario exista dado el id.
router.get("/:id", UserController.validateUserById);

module.exports = router;
