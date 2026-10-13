
import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface DailyExpense extends BaseDocument {
  date: Date;
  expenseType: string;
  paymentType: "Cash" | "UPI";
  amount: number;
  description?: string;
}

export type DailyExpenseDocument = DailyExpense & Document;

const DailyExpenseSchema: Schema<DailyExpense> = new Schema({
  date: {
    type: Date,
    required: true,
  },
  expenseType: {
    type: String,
    required: true,
    trim: true,
  },
  paymentType: {
    type: String,
    enum: ["Cash", "UPI"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
});

DailyExpenseSchema.add(BaseSchema);

export default mongoose.model<DailyExpenseDocument>(
  "DailyExpense",
  DailyExpenseSchema,
);
