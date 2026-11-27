import WhatsAppGroups,{ WhatsAppGroupsDocument } from "../../models/whatsappGroupModel";


export const create = async (
    groupData: Partial<WhatsAppGroupsDocument>,
): Promise<WhatsAppGroupsDocument> => {
    const group = new WhatsAppGroups(groupData);
    return await group.save();
};

export const findById = async (
    id: string,
): Promise<WhatsAppGroupsDocument | null> => {
    return WhatsAppGroups.findOne({
        _id: id,
        isDeleted: false,
    }).exec();
};

export const updateById = async (
    id: string,
    updateData: {
        name?: string;
        addNumbers?: string[];
        removeNumbers?: string[];
    },
): Promise<WhatsAppGroupsDocument | null> => {
    const updateQuery: any = {};

    if (updateData.name !== undefined) {
        updateQuery.$set = {
            name: updateData.name,
        };
    }

    if (updateData.addNumbers?.length) {
        updateQuery.$addToSet = {
            mobilenumbers: {
                $each: updateData.addNumbers,
            },
        };
    }

    if (updateData.removeNumbers?.length) {
        updateQuery.$pull = {
            mobilenumbers: {
                $in: updateData.removeNumbers,
            },
        };
    }

    return WhatsAppGroups.findOneAndUpdate(
        {
            _id: id,
            isDeleted: false,
        },
        updateQuery,
        {
            returnDocument: "after",
            runValidators: true,
        },
    ).exec();
};

export const getAllWhatsAppGroups = async (): Promise<
    WhatsAppGroupsDocument[]
> => {
    return WhatsAppGroups.find({
        isDeleted: false,
    })
        .sort({ createdAt: -1 })
        .exec();
};

export const deleteWhatsAppGroup = async (
    id: string,
): Promise<WhatsAppGroupsDocument | null> => {
    return WhatsAppGroups.findOneAndUpdate(
        {
            _id: id,
            isDeleted: false,
        },
        {
            $set: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        },
        {
            returnDocument: "after",
        },
    ).exec();
};