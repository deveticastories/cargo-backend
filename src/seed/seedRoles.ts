
import RoleModel from "../models/roleModel";

export const seedRoles = async (): Promise<void> => {
    const roleName = "Admin";

    const existingRole = await RoleModel.findOne({
        roleName,
        isDeleted: false,
    });

    if (existingRole) {
        console.log(`Role already exists: ${roleName}`);
        return;
    }

    await RoleModel.create({
        roleName,
        modules: [
            "Dashboard",
            "Roles",
            "Store",
            "Daily Expenses",
            "Reports",
        ],
    });

    console.log(`Role created: ${roleName}`);
};
