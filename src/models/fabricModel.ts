import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Fabric extends BaseDocument {
  name: string;
}

export type FabricDocument = Fabric & Document;

const FabricSchema: Schema<Fabric> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

FabricSchema.add(BaseSchema);

export default mongoose.model<FabricDocument>(
  "Fabric",
  FabricSchema,
);