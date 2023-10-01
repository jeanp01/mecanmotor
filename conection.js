const { Sequelize } = require("sequelize");

const database = "tarea01";
const username = "postgres";
const password = "99300jean";
const host = "localhost";
const port = 5432;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "postgres",
});

sequelize
  .sync()
  .then(() => console.log("Modelos sincronizados con la base de datos😎"))
  .catch((err) => console.error("Error al sincronizar modelos:", err));

module.exports = sequelize;
