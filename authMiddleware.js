const jwt = require("jsonwebtoken");

function authorizeEmployee(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, "tu_tksecreto"); //
    const userId = decoded.userId;
    if (decoded.role === "employee") {
      next();
    } else {
      return res
        .status(403)
        .json({
          error: 'Acceso no autorizado, se requiere el rol de "employee"',
        });
    }
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = authorizeEmployee;
