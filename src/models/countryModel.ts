import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Country extends BaseDocument {
  name: string;
  location?: string[];
}

export type CountryDocument = Country & Document;

const CountrySchema: Schema<Country> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: [
    {
      type: String,
      trim: true,
    },
  ],
});

CountrySchema.add(BaseSchema);

CountrySchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

export default mongoose.model<CountryDocument>(
  "Country",
  CountrySchema,
);