import mongoose from "mongoose";
import twilioClient from "../../config/twilio";
import * as whatsappMessageRepository from "./whatsappMessageRepository";
import { WhatsAppMessageDocument } from "../../models/whatsappMessageModel";
import logger from "../../utils/logger";

const getWhatsAppNumber = (phoneNumber: string): string => {
    let number = phoneNumber.replace(/[\s()-]/g, "");

    if (/^\d{10}$/.test(number)) {
        number = `+91${number}`;
    }

    if (!/^\+[1-9]\d{7,14}$/.test(number)) {
        throw new Error(`Invalid phone number: ${phoneNumber}`);
    }

    return `whatsapp:${number}`;
};

export const sendWhatsAppMessage = async (
    groupIds: string[],
    message: string,
    createdBy?: mongoose.Types.ObjectId,
): Promise<WhatsAppMessageDocument> => {
    try {
        if (!Array.isArray(groupIds) || groupIds.length === 0) {
            throw new Error("Please select at least one WhatsApp group");
        }

        if (!message?.trim()) {
            throw new Error("Message is required");
        }

        const invalidIds = groupIds.filter(
            (id) => !mongoose.Types.ObjectId.isValid(id),
        );

        if (invalidIds.length) {
            throw new Error("Invalid WhatsApp group ID");
        }

        const uniqueGroupIds = [...new Set(groupIds)];

        const groups =
            await whatsappMessageRepository.getGroupsByIds(
                uniqueGroupIds,
            );

        if (groups.length !== uniqueGroupIds.length) {
            throw new Error("One or more WhatsApp groups were not found");
        }

        const phoneNumbers = [
            ...new Set(
                groups.flatMap((group) =>
                    group.mobilenumbers.map((number) =>
                        number.trim(),
                    ),
                ),
            ),
        ];

        if (!phoneNumbers.length) {
            throw new Error("No phone numbers found in selected groups");
        }

        const recipients = phoneNumbers.map((phoneNumber) => ({
            phoneNumber,
            deliveryStatus: "Pending" as const,
        }));

        const campaign = await whatsappMessageRepository.create({
            groupIds: uniqueGroupIds.map(
                (id) => new mongoose.Types.ObjectId(id),
            ),
            message: message.trim(),
            totalRecipients: recipients.length,
            sentCount: 0,
            failedCount: 0,
            campaignStatus: "Processing",
            recipients,
            createdBy,
        });

        let sentCount = 0;
        let failedCount = 0;

        for (let index = 0; index < recipients.length; index++) {
            const recipient = recipients[index];

            try {
                const to = getWhatsAppNumber(recipient.phoneNumber);

                const response = await twilioClient.messages.create({
                    from: process.env.TWILIO_WHATSAPP_NUMBER!,
                    to,
                    body: message.trim(),
                    statusCallback:
                        process.env.TWILIO_STATUS_CALLBACK_URL,
                });

                campaign.recipients[index].deliveryStatus = "Sent";
                campaign.recipients[index].messageSid = response.sid;

                sentCount++;

                await campaign.save();
            } catch (error: unknown) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Failed to send WhatsApp message";

                campaign.recipients[index].deliveryStatus = "Failed";
                campaign.recipients[index].errorMessage = errorMessage;

                failedCount++;

                await campaign.save();

                logger.error("WhatsApp message sending failed", {
                    phoneNumber: recipient.phoneNumber,
                    error: errorMessage,
                });
            }
        }

        const campaignStatus =
            failedCount === recipients.length
                ? "Failed"
                : failedCount > 0
                    ? "Partially Failed"
                    : "Completed";

        const updatedCampaign =
            await whatsappMessageRepository.updateCampaign(
                String(campaign._id),
                {
                    sentCount,
                    failedCount,
                    campaignStatus,
                },
            );

        if (!updatedCampaign) {
            throw new Error("Unable to update WhatsApp campaign");
        }

        return updatedCampaign;
    } catch (error: unknown) {
        logger.error("Error sending WhatsApp bulk message", {
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error",
        });

        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to send WhatsApp messages",
        );
    }
};

export const getWhatsAppMessageHistory = async (): Promise<
    WhatsAppMessageDocument[]
> => {
    return whatsappMessageRepository.getAll();
};

export const getWhatsAppMessageById = async (
    id: string,
): Promise<WhatsAppMessageDocument | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid WhatsApp campaign ID");
    }

    return whatsappMessageRepository.findById(id);
};

export const updateWhatsAppDeliveryStatus = async (
    messageSid: string,
    twilioStatus: string,
    errorMessage?: string,
): Promise<void> => {
    const statusMap: Record<string, string> = {
        accepted: "Queued",
        queued: "Queued",
        sending: "Sending",
        sent: "Sent",
        delivered: "Delivered",
        read: "Read",
        failed: "Failed",
        undelivered: "Undelivered",
    };

    const deliveryStatus = statusMap[twilioStatus.toLowerCase()];

    if (!deliveryStatus) {
        logger.warn("Unknown Twilio message status", {
            messageSid,
            twilioStatus,
        });
        return;
    }

    await whatsappMessageRepository.updateRecipientBySid(
        messageSid,
        deliveryStatus,
        errorMessage,
    );
};