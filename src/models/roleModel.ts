
import mongoose, { Schema, type Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export const ROLE_MODULES = [
    "Dashboard",
    "Bookings",
    "Containers",
    "Countries",
    "Credit Notes",
    "Customers",
    "Employee",
    "Fabrics",
    "Invoices",
    "Packages",
    "Petty Cash",
    "Pickup Assign",
    "Daily Expenses",
    "Delivery Partners",
    "Pickup Partner",
    "Reports",
    "Pre Booking",
    "Pricing",
    "Receipt Entries",
    "Store",
    "Stuffings",
    "Roles"
] as const;

export type RoleModule = (typeof ROLE_MODULES)[number];

export interface Role extends BaseDocument {
    roleName: string;
    modules?: RoleModule[];
}

export type RoleDocument = Role & Document;

const RoleSchema = new Schema<RoleDocument>({
    ...BaseSchema.obj,
    roleName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    modules: {
        type: [String],
        enum: ROLE_MODULES,
        default: ["Dashboard"],
    },
} as mongoose.SchemaDefinition<RoleDocument>);

const RoleModel = mongoose.model<RoleDocument>(
    "Role",
    RoleSchema,
);

export default RoleModel;
