import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Booking extends BaseDocument {
  bookingId: string;

  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  pickupOption: mongoose.Types.ObjectId;

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

  brandHandlingCharge: number;
  pickupCharge: number;
  bundleHandlingCharge: number;
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
    required: true,
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
    enum: ["Pending", "Stuffed"],
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
});

BookingSchema.add(BaseSchema);

export default mongoose.model<BookingDocument>(
  "Booking",
  BookingSchema,
);