import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export type UnitStatus = "Active" | "Inactive";

export interface Unit extends BaseDocument {
    name: string;
    unitStatus: UnitStatus;
}

export type UnitDocument = Unit & Document;

const UnitSchema: Schema<Unit> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    unitStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
        required: true,
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

export default mongoose.model<UnitDocument>("Unit", UnitSchema);