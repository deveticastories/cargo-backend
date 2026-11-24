import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Wallet extends BaseDocument {
    userId: mongoose.Types.ObjectId;
    balance: number;
}

export type WalletDocument = Wallet & Document;

const WalletSchema: Schema<Wallet> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
        required: true,
    },
});

WalletSchema.add(BaseSchema);

export default mongoose.model<WalletDocument>(
    "Wallet",
    WalletSchema,
);