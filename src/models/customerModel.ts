
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Customer extends BaseDocument {
  customerType: "Sender" | "Receiver";
  name?: string;
  whatsapp?: string;
  alternativeNo?: string;
  country?: string;
  location?: string;
  discount?: number;
}

export type CustomerDocument = Customer & Document;

const CustomerSchema: Schema<Customer> = new Schema({
  customerType: {
    type: String,
    enum: ["Sender", "Receiver"],
    default: "Sender",
  },
  name: {
    type: String,
    trim: true,
  },
  whatsapp: {
    type: String,
    trim: true,
  },
  alternativeNo: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

CustomerSchema.add(BaseSchema);

CustomerSchema.index(
  { whatsapp: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
      whatsapp: { $type: "string" },
    },
  },
);

export default mongoose.model<CustomerDocument>(
  "Customer",
  CustomerSchema,
);
