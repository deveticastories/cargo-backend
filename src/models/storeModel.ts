import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Store extends BaseDocument {
  location: string;
  contact: string;
  inCharge: string;
}

export type StoreDocument = Store & Document;

const StoreSchema: Schema<Store> = new Schema({
  location: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  contact: {
    type: String,
    required: true,
    trim: true,
  },

  inCharge: {
    type: String,
    required: true,
    trim: true,
  },
});

StoreSchema.add(BaseSchema);

export default mongoose.model<StoreDocument>(
  "Store",
  StoreSchema,
);