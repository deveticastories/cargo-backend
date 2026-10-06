import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const seedSuperAdmin = async (): Promise<void> => {
    const email = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.SUPER_ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error(
            "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required",
        );
    }

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
        console.log(`SuperAdmin already exists: ${email}`);
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
        email,
        password: passwordHash,
        role: "SuperAdmin",
    });

    console.log(`SuperAdmin created: ${email}`);
};