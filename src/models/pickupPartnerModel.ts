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
    unique: true,
    trim: true,
  },
});

PickupPartnerSchema.add(BaseSchema);

export default mongoose.model<PickupPartnerDocument>(
  "PickupPartner",
  PickupPartnerSchema,
);