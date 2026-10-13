
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel.js";

export interface PettyCash extends BaseDocument {
  pettyCashBalance: number;
  balanceAfterExpenses: number;
}

export type PettyCashDocument = PettyCash & Document;

const PettyCashSchema: Schema = new Schema({
  pettyCashBalance: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  balanceAfterExpenses: {
    type: Number,
    required: true,
    default: 0,
  },
});

PettyCashSchema.add(BaseSchema);

export default mongoose.model<PettyCashDocument>(
  "PettyCash",
  PettyCashSchema,
);
