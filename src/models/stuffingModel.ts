
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Stuffing extends BaseDocument {
  container: mongoose.Types.ObjectId;
  bookings: mongoose.Types.ObjectId[];
  date: Date;
}

export type StuffingDocument = Stuffing & Document;

const StuffingSchema: Schema<Stuffing> = new Schema({
  container: {
    type: Schema.Types.ObjectId,
    ref: "Container",
    required: true,
  },

  bookings: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    required: true,
    validate: {
      validator: (value: mongoose.Types.ObjectId[]) =>
        value.length > 0,
      message: "At least one booking is required",
    },
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

StuffingSchema.add(BaseSchema);

export default mongoose.model<StuffingDocument>(
  "Stuffing",
  StuffingSchema,
);
