errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ error: "algo salio mal" });
};

module.exports = errorHandler;
