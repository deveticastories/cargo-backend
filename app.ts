import express, {
  Application,
  Request,
  Response,
} from "express";

import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./src/modules/auth/authRoutes.ts";
import employeeRoutes from "./src/modules/employee/employeeRoutes.ts";
import swaggerSpec from "./src/config/swagger.js";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Cargo Admin Backend API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

export default app;