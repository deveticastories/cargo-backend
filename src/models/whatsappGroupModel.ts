import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface WhatsAppGroups extends BaseDocument {
    name: string;
    mobilenumbers: string[];
}

export type WhatsAppGroupsDocument = WhatsAppGroups & Document;

const WhatsAppGroupsSchema: Schema<WhatsAppGroups> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobilenumbers: {
        type: [String],
        required: true,
        default: [],
    },
});

WhatsAppGroupsSchema.add(BaseSchema);

export default mongoose.model<WhatsAppGroupsDocument>(
    "WhatsAppGroups",
    WhatsAppGroupsSchema,
);