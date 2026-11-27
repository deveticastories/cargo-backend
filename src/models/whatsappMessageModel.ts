import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface WhatsAppRecipient {
    phoneNumber: string;
    deliveryStatus:
        | "Pending"
        | "Queued"
        | "Sending"
        | "Sent"
        | "Delivered"
        | "Read"
        | "Failed"
        | "Undelivered";
    messageSid?: string;
    errorMessage?: string;
}

export interface WhatsAppMessage extends BaseDocument {
    groupIds: mongoose.Types.ObjectId[];
    message: string;
    totalRecipients: number;
    sentCount: number;
    failedCount: number;
    campaignStatus:
        | "Processing"
        | "Completed"
        | "Partially Failed"
        | "Failed";
    recipients: WhatsAppRecipient[];
}

export type WhatsAppMessageDocument = WhatsAppMessage & Document;

const WhatsAppRecipientSchema = new Schema<WhatsAppRecipient>(
    {
        phoneNumber: {
            type: String,
            required: true,
        },
        deliveryStatus: {
            type: String,
            enum: [
                "Pending",
                "Queued",
                "Sending",
                "Sent",
                "Delivered",
                "Read",
                "Failed",
                "Undelivered",
            ],
            default: "Pending",
        },
        messageSid: {
            type: String,
        },
        errorMessage: {
            type: String,
        },
    },
    { _id: false },
);

const WhatsAppMessageSchema: Schema<WhatsAppMessage> = new Schema({
    groupIds: [{
        type: Schema.Types.ObjectId,
        ref: "WhatsAppGroups",
        required: true,
    }],
    message: {
        type: String,
        required: true,
        trim: true,
    },
    totalRecipients: {
        type: Number,
        default: 0,
    },
    sentCount: {
        type: Number,
        default: 0,
    },
    failedCount: {
        type: Number,
        default: 0,
    },
    campaignStatus: {
        type: String,
        enum: ["Processing", "Completed", "Partially Failed", "Failed"],
        default: "Processing",
    },
    recipients: {
        type: [WhatsAppRecipientSchema],
        default: [],
    },
});

WhatsAppMessageSchema.add(BaseSchema);

export default mongoose.model<WhatsAppMessageDocument>(
    "WhatsAppMessage",
    WhatsAppMessageSchema,
);