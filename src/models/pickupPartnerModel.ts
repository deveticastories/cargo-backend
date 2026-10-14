
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface PickupPartner extends BaseDocument {
  name: string;
  whatsapp: string;
}

export type PickupPartnerDocument = PickupPartner & Document;

const PickupPartnerSchema: Schema<PickupPartner> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true,
  },
});

PickupPartnerSchema.add(BaseSchema);

PickupPartnerSchema.index(
  { whatsapp: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

export default mongoose.model<PickupPartnerDocument>(
  "PickupPartner",
  PickupPartnerSchema,
);
