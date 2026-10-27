import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface User extends BaseDocument {
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;}

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
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

UserSchema.add(BaseSchema);

export default mongoose.model<UserDocument>("User", UserSchema);