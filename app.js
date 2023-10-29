const express = require("express");
const app = express();
const port = process.env.PORT || 3002;

//enrutamiento
const usersRoutes = require("./routes/users.js");
const repairsRoutes = require("./routes/repairs.js");

//analizar cuerpo de las solicitudes json
app.use(express.json());

//juntar enrrutamiento a ruta base
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/repairs", repairsRoutes);

const conectcb = require("./conection.js");

app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port} 🤖`);
});

const errorHandler = require("./errorHandler.js");
app.use(errorHandler);
