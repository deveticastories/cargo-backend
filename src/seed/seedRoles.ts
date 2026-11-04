import RoleModel, { ROLE_MODULES } from "../models/roleModel";

export const seedRoles = async (): Promise<void> => {
    const roles = [
        {
            roleName: "Super Admin",
            modules: [...ROLE_MODULES],
        },
        {
            roleName: "Admin",
            modules: [...ROLE_MODULES],
        },
        {
            roleName: "Transit",
            modules: [],
        },
        {
            roleName: "Pickup",
            modules: [],
        },
    ];

    for (const role of roles) {
        const existingRole = await RoleModel.findOne({
            roleName: role.roleName,
            isDeleted: false,
        });

        if (existingRole) {
            existingRole.modules = role.modules;
            await existingRole.save();

            console.log(`Role updated: ${role.roleName}`);
        } else {
            await RoleModel.create(role);

            console.log(`Role created: ${role.roleName}`);
        }
    }
};