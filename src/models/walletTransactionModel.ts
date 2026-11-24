import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface WalletTransaction extends BaseDocument {
    userId: mongoose.Types.ObjectId;
    amount: number;
    type: "Credit" | "Debit";
    description: string;
    referenceId?: mongoose.Types.ObjectId;
}

export type WalletTransactionDocument =
    WalletTransaction & Document;

const WalletTransactionSchema: Schema<WalletTransaction> =
    new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },
        type: {
            type: String,
            enum: ["Credit", "Debit"],
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        referenceId: {
            type: Schema.Types.ObjectId,
            ref: "PickupAssign",
        },
    });

WalletTransactionSchema.add(BaseSchema);

WalletTransactionSchema.index(
    { referenceId: 1, type: 1 },
    {
        unique: true,
        partialFilterExpression: {
            type: "Debit",
            referenceId: { $exists: true },
        },
    },
);

WalletTransactionSchema.index({
    userId: 1,
    createdAt: -1,
});

export default mongoose.model<WalletTransactionDocument>(
    "WalletTransaction",
    WalletTransactionSchema,
);