
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
    trim: true,
  },
});

FabricSchema.add(BaseSchema);

FabricSchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

export default mongoose.model<FabricDocument>(
  "Fabric",
  FabricSchema,
);
