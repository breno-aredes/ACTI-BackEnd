import express from "express";
import cors from "cors";
import "dotenv/config";
import Database from "./config/database";
import partnersRoutes from "./routes/partnersRoutes";
import { errorHandler, requestLogger, responseLogger } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(responseLogger);

app.use("/partners", partnersRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Servidor funcionando",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: {
      server: process.env.DB_SERVER,
      database: process.env.DB_NAME,
      connected: true,
    },
  });
});

app.use(errorHandler);

export const init = async (): Promise<void> => {
  try {
    const database = Database.getInstance();
    await database.connect();
    console.log("🚀 Aplicação inicializada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar aplicação:", error);
    process.exit(1);
  }
};

export default app;
