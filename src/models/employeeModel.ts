import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Employee extends BaseDocument {
  name: string;
  empId: string;
  contact: string;
  bloodGroup?: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;
}

export type EmployeeDocument = Employee & Document;

const EmployeeSchema: Schema<Employee> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  empId: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
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
    required: true,
  },
});

EmployeeSchema.add(BaseSchema);

EmployeeSchema.index(
  { empId: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

EmployeeSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

export default mongoose.model<EmployeeDocument>(
  "Employee",
  EmployeeSchema,
);