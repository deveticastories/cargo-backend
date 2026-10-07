import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface PreBooking extends BaseDocument {
  preBookingId: string;
  sender: mongoose.Types.ObjectId;
  phoneNumber: string;
  date: Date;
  bundleCount: number;
  bundleType: "Bundle" | "Box" | "CBM" | "KG";
  preBookingStatus: "Pending" | "Collected" | "Canceled";
}

export type PreBookingDocument = PreBooking & Document;

const PreBookingSchema: Schema<PreBooking> = new Schema({
  preBookingId: {
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

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },

  date: {
    type: Date,
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

  preBookingStatus: {
    type: String,
    enum: ["Pending", "Collected", "Canceled"],
    default: "Pending",
  },
});

PreBookingSchema.add(BaseSchema);

export default mongoose.model<PreBookingDocument>(
  "PreBooking",
  PreBookingSchema,
);