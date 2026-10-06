import express, {
  Application,
  Request,
  Response,
} from "express";

import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./src/modules/auth/authRoutes.js";
import swaggerSpec from "./src/config/swagger.js";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger - PUBLIC
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Cargo Admin Backend API is running");
});

// Auth
app.use("/api/auth", authRoutes);

export default app;