import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Pricing extends BaseDocument {
  from: string;
  to: string;
  uom: "Bundle" | "Box" | "CBM" | "KG";
  price: number;
}

export type PricingDocument = Pricing & Document;

const PricingSchema: Schema<Pricing> = new Schema({
  from: {
    type: String,
    required: true,
    trim: true,
  },

  to: {
    type: String,
    required: true,
    trim: true,
  },

  uom: {
    type: String,
    enum: ["Bundle", "Box", "CBM", "KG"],
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

PricingSchema.add(BaseSchema);

PricingSchema.index(
  { from: 1, to: 1, uom: 1 },
  { unique: true },
);

export default mongoose.model<PricingDocument>(
  "Pricing",
  PricingSchema,
);