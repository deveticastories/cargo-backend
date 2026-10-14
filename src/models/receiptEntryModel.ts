import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface ReceiptEntry extends BaseDocument {
  invoice: mongoose.Types.ObjectId;

  date: Date;
  receivableAmount: number;
  receivedAmount: number;
  balanceAmount: number;

  receivedDate: Date;

  deliveryPartnerAmount: number;
  deliveryPartnerStatus: "Pending" | "Paid";
}

export type ReceiptEntryDocument = ReceiptEntry & Document;

const ReceiptEntrySchema: Schema<ReceiptEntry> = new Schema({
  invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice",
    required: true,
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  receivableAmount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  receivedAmount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },

  balanceAmount: {
    type: Number,
    required: true,
    default: 0,
  },

  receivedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  deliveryPartnerAmount: {
    type: Number,
    default: 0,
    min: 0,
  },

  deliveryPartnerStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
});

ReceiptEntrySchema.add(BaseSchema);

export default mongoose.model<ReceiptEntryDocument>(
  "ReceiptEntry",
  ReceiptEntrySchema,
);
