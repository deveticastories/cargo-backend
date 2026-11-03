import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Unit extends BaseDocument {
  name: string;
}

export type UnitDocument = Unit & Document;

const UnitSchema: Schema<Unit> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

UnitSchema.add(BaseSchema);

UnitSchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: { isDeleted: false },
  },
);

export default mongoose.model<UnitDocument>(
  "Unit",
  UnitSchema,
);