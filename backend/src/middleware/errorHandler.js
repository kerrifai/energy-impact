function notFoundHandler(req, res, next) {
  res.status(404).json({ error: "Ruta no encontrada" });
}

function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ error: message });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
