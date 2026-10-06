import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Country extends BaseDocument {
  name: string;
}

export type CountryDocument = Country & Document;

const CountrySchema: Schema<Country> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

CountrySchema.add(BaseSchema);

export default mongoose.model<CountryDocument>(
  "Country",
  CountrySchema,
);