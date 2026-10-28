
import RoleModel, { ROLE_MODULES } from "../models/roleModel";

export const seedRoles = async (): Promise<void> => {
    const roleName = "Admin";
    const modules = [...ROLE_MODULES];

    const existingRole = await RoleModel.findOne({
        roleName,
        isDeleted: false,
    });

    if (existingRole) {
        existingRole.modules = modules;
        await existingRole.save();

        console.log(`Role updated: ${roleName}`);
        return;
    }

    await RoleModel.create({
        roleName,
        modules,
    });

    console.log(`Role created: ${roleName}`);
};
