import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";
import { PickupPartnerDocument } from "./pickupPartnerModel";

export interface PickupAssign extends BaseDocument {
  transport: PickupPartnerDocument["_id"];
  lrNo: string;
  bundleCount: number;
  amount: number;
  paymentStatus: "Unpaid" | "Paid";
  pickupStatus: "Pending" | "Collected";
  collectedBundle: number;
}

export type PickupAssignDocument = PickupAssign & Document;

const PickupAssignSchema: Schema<PickupAssign> = new Schema({
  transport: {
    type: Schema.Types.ObjectId,
    ref: "PickupPartner",
    required: true,
  },

  lrNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  bundleCount: {
    type: Number,
    required: true,
    min: 1,
  },

  amount: {
    type: Number,
    required: true,
    min: 0,
  },

  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid",
  },

  pickupStatus: {
    type: String,
    enum: ["Pending", "Collected"],
    default: "Pending",
  },

  collectedBundle: {
    type: Number,
    default: 0,
    min: 0,
  },
});

PickupAssignSchema.add(BaseSchema);

export default mongoose.model<PickupAssignDocument>(
  "PickupAssign",
  PickupAssignSchema,
);