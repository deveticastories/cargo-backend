import express, {
  Application,
  Request,
  Response,
} from "express";

import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./src/modules/auth/authRoutes.js";
import employeeRoutes from "./src/modules/employee/employeeRoutes.js";
import customerRoutes from "./src/modules/customer/customerRoutes.js";
import storeRoutes from "./src/modules/store/storeRoutes.js";
import countryRoutes from "./src/modules/country/countryRoutes.js";
import deliveryPartnerRoutes from "./src/modules/deliveryPartner/deliveryPartnerRoutes.js";
import pickupPartnerRoutes from "./src/modules/pickupPartner/pickupPartnerRoutes.js";
import pricingRoutes from "./src/modules/price/priceRoutes.js";
import productRoutes from "./src/modules/product/productRoutes.js";
import fabricRoutes from "./src/modules/fabric/fabricRoutes.js";
import pickupAssignRoutes from "./src/modules/pickupAssign/pickupAssignRoutes.js";
import prebookingRoutes from "./src/modules/prebooking/prebookingRoutes.js";
import bookingRoutes from "./src/modules/booking/bookingRoutes.js";
import packageRoutes from "./src/modules/package/packageRoutes.js";
import containerRoutes from "./src/modules/container/containerRoutes.js";
import stuffingRoutes from "./src/modules/stuffing/stuffingRoutes.js";
import swaggerSpec from "./src/config/swagger.js";



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
app.use("/api/customers", customerRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/delivery-partners", deliveryPartnerRoutes);
app.use("/api/pickup-partners", pickupPartnerRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/fabrics", fabricRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pickup-assigns", pickupAssignRoutes);
app.use("/api/pre-bookings", prebookingRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/containers", containerRoutes);
app.use("/api/stuffings",stuffingRoutes);
export default app;