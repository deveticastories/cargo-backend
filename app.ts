import express, {
  Application,
  Request,
  Response,
} from "express";

import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./src/modules/auth/authRoutes.ts";
import employeeRoutes from "./src/modules/employee/employeeRoutes.ts";
import customerRoutes from "./src/modules/customer/customerRoutes.ts";
import storeRoutes from "./src/modules/store/storeRoutes.ts";
import countryRoutes from "./src/modules/country/countryRoutes.ts";
import deliveryPartnerRoutes from "./src/modules/deliveryPartner/deliveryPartnerRoutes.ts";
import pickupPartnerRoutes from "./src/modules/pickupPartner/pickupPartnerRoutes.ts";
import pricingRoutes from "./src/modules/price/priceRoutes.ts";
import productRoutes from "./src/modules/product/productRoutes.ts";
import fabricRoutes from "./src/modules/fabric/fabricRoutes.ts";
import pickupAssignRoutes from "./src/modules/pickupAssign/pickupAssignRoutes.ts";
import prebookingRoutes from "./src/modules/prebooking/prebookingRoutes.ts";
import bookingRoutes from "./src/modules/booking/bookingRoutes.ts";
import packageRoutes from "./src/modules/package/packageRoutes.ts";
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
export default app;