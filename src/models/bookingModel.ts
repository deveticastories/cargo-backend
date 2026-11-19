
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Booking extends BaseDocument {
  bookingId: string;

  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;

  // Pickup Assign or Pickup Partner
  pickupOption: mongoose.Types.ObjectId | null;
  pickupPartner: mongoose.Types.ObjectId | null;
  pickupVia: "Our Pickup Boy" | "Direct to Store" | "Pickup Partner";

  date: Date;

  billOption: "With Bill" | "Without Bill";

  bundleCount: number;
  bundleType: "Bundle" | "Box" | "CBM" | "KG";
  bundle: number | null;

  productType: "Branded" | "Normal";

  packingStatus:
    | "Ready to Ship"
    | "Repacking Required";

  packageListStatus: "Added" | "Pending";

  stuffStatus: "Pending" | "Stuffed" | "Ready to Stuff";

  stuffed: boolean;
  sentToStuffing: boolean;

  // Existing charge fields
  brandHandlingCharge: number;
  pickupCharge: number;
  bundleHandlingCharge: number;

  // New total charge fields
  totalBrandHandlingCharge: number;
  totalBundleHandlingCharge: number;
}

export type BookingDocument = Booking & Document;

const BookingSchema: Schema<Booking> = new Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  receiver: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  pickupOption: {
    type: Schema.Types.ObjectId,
    ref: "PickupAssign",
    default: null,
  },

  pickupPartner: {
    type: Schema.Types.ObjectId,
    ref: "PickupPartner",
    default: null,
  },

  // How the goods reach the store. Only "Pickup Partner" needs a ref
  // (pickupPartner or pickupOption); the other two may have neither.
  pickupVia: {
    type: String,
    enum: ["Our Pickup Boy", "Direct to Store", "Pickup Partner"],
    default: "Our Pickup Boy",
  },

  date: {
    type: Date,
    required: true,
  },

  billOption: {
    type: String,
    enum: ["With Bill", "Without Bill"],
    required: true,
  },

  bundleCount: {
    type: Number,
    required: true,
    min: 1,
  },

  bundleType: {
    type: String,
    enum: ["Bundle", "Box", "CBM", "KG"],
    required: true,
  },

  bundle: {
    type: Number,
    default: null,
    min: 0,
  },

  productType: {
    type: String,
    enum: ["Branded", "Normal"],
    required: true,
  },

  packingStatus: {
    type: String,
    enum: ["Ready to Ship", "Repacking Required"],
    default: "Repacking Required",
  },

  packageListStatus: {
    type: String,
    enum: ["Added", "Pending"],
    default: "Pending",
  },

  stuffStatus: {
    type: String,
    enum: ["Pending", "Stuffed", "Ready to Stuff"],
    default: "Pending",
  },

  stuffed: {
    type: Boolean,
    default: false,
  },

  sentToStuffing: {
    type: Boolean,
    default: false,
  },

  // Existing charge fields
  brandHandlingCharge: {
    type: Number,
    default: 0,
    min: 0,
  },

  pickupCharge: {
    type: Number,
    default: 0,
    min: 0,
  },

  bundleHandlingCharge: {
    type: Number,
    default: 0,
    min: 0,
  },

  // New total charge fields
  totalBrandHandlingCharge: {
    type: Number,
    default: 0,
    min: 0,
  },

  totalBundleHandlingCharge: {
    type: Number,
    default: 0,
    min: 0,
  },
});

BookingSchema.add(BaseSchema);

export default mongoose.model<BookingDocument>(
  "Booking",
  BookingSchema,
);
