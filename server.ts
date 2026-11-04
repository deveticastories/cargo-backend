import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./src/config/db";
import { seedSuperAdmin } from "./src/seed/seedSuperAdmin";
import { seedRoles } from "./src/seed/seedRoles.js";
import { seedPickupPartners } from "./src/seed/seedPickupPartner";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    await seedRoles();
    await seedSuperAdmin();
    await seedPickupPartners();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();