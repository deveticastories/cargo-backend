import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface PackageProduct {
  product: mongoose.Types.ObjectId;
  quantity: number;
  fabric?: mongoose.Types.ObjectId;
  description?: string;
}

export interface PackageBundle {
  bundleNo: number;
  netWeight: number;
  grossWeight: number;
  products: PackageProduct[];
}

export interface Package extends BaseDocument {
  booking: mongoose.Types.ObjectId;

  repackedBy?: string;

  bundles: PackageBundle[];
}

export type PackageDocument = Package & Document;

const PackageProductSchema = new Schema<PackageProduct>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    fabric: {
      type: Schema.Types.ObjectId,
      ref: "Fabric",
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    _id: true,
  },
);

const PackageBundleSchema = new Schema<PackageBundle>(
  {
    bundleNo: {
      type: Number,
      required: true,
      min: 1,
    },

    netWeight: {
      type: Number,
      default: 0,
      min: 0,
    },

    grossWeight: {
      type: Number,
      default: 0,
      min: 0,
    },

    products: {
      type: [PackageProductSchema],
      default: [],
    },
  },
  {
    _id: true,
  },
);

const PackageSchema: Schema<Package> = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true,
  },

  repackedBy: {
    type: String,
    trim: true,
  },

  bundles: {
    type: [PackageBundleSchema],
    default: [],
  },
});

PackageSchema.add(BaseSchema);

export default mongoose.model<PackageDocument>(
  "Package",
  PackageSchema,
);