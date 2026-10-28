
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface User extends BaseDocument {
    name?: string;
    empId?: string;
    contact?: string;
    bloodGroup?: string;
    email: string;
    password: string;
    role?: mongoose.Types.ObjectId;
}

export type UserDocument = User & Document;

const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        trim: true,
    },
    empId: {
        type: String,
        trim: true,
    },
    contact: {
        type: String,
        trim: true,
    },
    bloodGroup: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
    },
});

UserSchema.add(BaseSchema);

UserSchema.index(
    { empId: 1 },
    {
        unique: true,
        partialFilterExpression: {
            isDeleted: false,
            empId: { $type: "string" },
        },
    },
);

UserSchema.index(
    { email: 1 },
    {
        unique: true,
        partialFilterExpression: {
            isDeleted: false,
            email: { $type: "string" },
        },
    },
);

export default mongoose.model<UserDocument>("User", UserSchema);
