
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface DeliveryAssign extends BaseDocument {
  booking: mongoose.Types.ObjectId;
  deliveryPartner: mongoose.Types.ObjectId;
  lrNumber: string;
  expectedDeliveryDate: Date;
  amount: number;
}

export type DeliveryAssignDocument = DeliveryAssign & Document;

const DeliveryAssignSchema: Schema<DeliveryAssign> = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  deliveryPartner: {
    type: Schema.Types.ObjectId,
    ref: "DeliveryPartner",
    required: true,
  },
  lrNumber: {
    type: String,
    required: true,
    trim: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

DeliveryAssignSchema.add(BaseSchema);

export default mongoose.model<DeliveryAssignDocument>(
  "DeliveryAssign",
  DeliveryAssignSchema,
);
