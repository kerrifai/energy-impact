const express = require("express");
const cors = require("cors");
const { PORT, MONGO_URI } = require("./config");
const { connectDB } = require("./db");
const actionsRouter = require("./routes/actions.routes");
const {
  notFoundHandler,
  errorHandler
} = require("./middleware/errorHandler");

async function bootstrap() {
  await connectDB(MONGO_URI);

  const app = express();

  // Middlewares base
  app.use(cors());
  app.use(express.json());

  // Healthcheck
  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Rutas
  app.use("/api/actions", actionsRouter);

  // Middleware de errores
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Energy Impact API en http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error("❌ Error arrancando la API:", err);
  process.exit(1);
});
