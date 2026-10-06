import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface User extends BaseDocument {
  email: string;
  password: string;
  role: "SuperAdmin" | "Admin";
}

export type UserDocument = User & Document;

const UserSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  role: {
    type: String,
    enum: ["SuperAdmin", "Admin"],
    default: "Admin",
  },
});

UserSchema.add(BaseSchema);

export default mongoose.model<UserDocument>("User", UserSchema);