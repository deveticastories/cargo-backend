import WhatsAppMessage, {
    WhatsAppMessageDocument,
} from "../../models/whatsappMessageModel";

import WhatsAppGroups from "../../models/whatsappGroupModel";

export const create = async (
    data: Partial<WhatsAppMessageDocument>,
): Promise<WhatsAppMessageDocument> => {
    const campaign = new WhatsAppMessage(data);
    return await campaign.save();
};

export const findById = async (
    id: string,
): Promise<WhatsAppMessageDocument | null> => {
    return WhatsAppMessage.findById(id).exec();
};

export const getAll = async (): Promise<WhatsAppMessageDocument[]> => {
    return WhatsAppMessage.find({
        isDeleted: false,
    })
        .sort({ createdAt: -1 })
        .exec();
};

export const getGroupsByIds = async (groupIds: string[]) => {
    return WhatsAppGroups.find({
        _id: { $in: groupIds },
        isDeleted: false,
    }).exec();
};

export const updateRecipientBySid = async (
    messageSid: string,
    deliveryStatus: string,
    errorMessage?: string,
) => {
    const updateData: Record<string, unknown> = {
        "recipients.$.deliveryStatus": deliveryStatus,
    };

    if (errorMessage) {
        updateData["recipients.$.errorMessage"] = errorMessage;
    }

    return WhatsAppMessage.findOneAndUpdate(
        {
            "recipients.messageSid": messageSid,
        },
        {
            $set: updateData,
        },
        {
            returnDocument: "after",
        },
    ).exec();
};

export const updateCampaign = async (
    id: string,
    data: {
        sentCount: number;
        failedCount: number;
        campaignStatus:
            | "Processing"
            | "Completed"
            | "Partially Failed"
            | "Failed";
    },
) => {
    return WhatsAppMessage.findByIdAndUpdate(
        id,
        { $set: data },
        { returnDocument: "after" },
    ).exec();
};