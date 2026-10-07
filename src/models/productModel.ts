import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Product extends BaseDocument {
  name: string;
}

export type ProductDocument = Product & Document;

const ProductSchema: Schema<Product> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

ProductSchema.add(BaseSchema);

export default mongoose.model<ProductDocument>(
  "Product",
  ProductSchema,
);