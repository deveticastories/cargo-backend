
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import RoleModel from "../models/roleModel.js";

export const seedSuperAdmin = async (): Promise<void> => {
    const email = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
    const password = process.env.SUPER_ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error(
            "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required",
        );
    }

    const adminRole = await RoleModel.findOne({
        roleName: "Admin",
        isDeleted: false,
    });

    if (!adminRole) {
        throw new Error("Admin role not found. Please seed roles first.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        await User.updateOne(
            { email },
            {
                $setOnInsert: {
                    email,
                    password: passwordHash,
                    role: adminRole._id,
                },
            },
            { upsert: true },
        );

        console.log(`SuperAdmin ensured: ${email}`);
    } catch (error: unknown) {
        if (
            error instanceof Error &&
            "code" in error &&
            error.code === 11000
        ) {
            const existingAdmin = await User.findOne({ email });

            if (existingAdmin) {
                console.log(`SuperAdmin already exists: ${email}`);
                return;
            }
        }

        throw error;
    }
};
