import express, {
  Application,
  Request,
  Response,
} from "express";

import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./src/modules/auth/authRoutes";
import employeeRoutes from "./src/modules/employee/employeeRoutes";
import customerRoutes from "./src/modules/customer/customerRoutes";
import storeRoutes from "./src/modules/store/storeRoutes";
import countryRoutes from "./src/modules/country/countryRoutes";
import deliveryPartnerRoutes from "./src/modules/deliveryPartner/deliveryPartnerRoutes";
import pickupPartnerRoutes from "./src/modules/pickupPartner/pickupPartnerRoutes";
import pricingRoutes from "./src/modules/price/priceRoutes";
import productRoutes from "./src/modules/product/productRoutes";
import fabricRoutes from "./src/modules/fabric/fabricRoutes";
import pickupAssignRoutes from "./src/modules/pickupAssign/pickupAssignRoutes";
import prebookingRoutes from "./src/modules/prebooking/prebookingRoutes";
import bookingRoutes from "./src/modules/booking/bookingRoutes";
import packageRoutes from "./src/modules/package/packageRoutes";
import containerRoutes from "./src/modules/container/containerRoutes";
import stuffingRoutes from "./src/modules/stuffing/stuffingRoutes";
import invoiceRoutes from "./src/modules/invoice/invoiceRoutes";
import creditNoteRoutes from "./src/modules/creditNote/creditNoteRoutes";
import dailyExpenseRoutes from "./src/modules/dailyExpense/dailyExpenseRoutes";
import reportsRoutes from "./src/modules/reports/reportsRoutes";
import receiptEntryRoutes from "./src/modules/receiptEntry/receiptEntryRoutes";
import roleRoutes from "./src/modules/role/roleRoutes"
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
app.use("/api/stuffings", stuffingRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/credit-notes", creditNoteRoutes);
app.use("/api/daily-expenses", dailyExpenseRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/receipt-entries", receiptEntryRoutes);
app.use("/api/roles",roleRoutes)
export default app;