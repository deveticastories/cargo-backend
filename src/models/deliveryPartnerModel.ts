import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";
import { CountryDocument } from "./countryModel";

export interface DeliveryPartner extends BaseDocument {
  name: string;
  whatsapp: string;
  from?: CountryDocument["_id"];
  toCountry?: CountryDocument["_id"];
  charge: number;
}

export type DeliveryPartnerDocument =
  DeliveryPartner & Document;

const DeliveryPartnerSchema: Schema<DeliveryPartner> =
  new Schema({
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

    from: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },

    toCountry: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },

    charge: {
      type: Number,
      default: 0,
    },
  });

DeliveryPartnerSchema.add(BaseSchema);

export default mongoose.model<DeliveryPartnerDocument>(
  "DeliveryPartner",
  DeliveryPartnerSchema,
);