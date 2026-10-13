
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Invoice extends BaseDocument {
  invoiceNo: string;
  container: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  subtotal: number;
  additionalCharges: number;
  receivableDiscount: number;
  deliveryPartner: mongoose.Types.ObjectId;
  total: number;
}

export type InvoiceDocument = Invoice & Document;

const InvoiceSchema: Schema<Invoice> = new Schema({
  invoiceNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  container: {
    type: Schema.Types.ObjectId,
    ref: "Container",
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  additionalCharges: {
    type: Number,
    default: 0,
    min: 0,
  },
  receivableDiscount: {
    type: Number,
    default: 0,
    min: 0,
  },
  deliveryPartner: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryPartner",
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
});

InvoiceSchema.add(BaseSchema);

export default mongoose.model<InvoiceDocument>(
  "Invoice",
  InvoiceSchema,
);
