import mongoose from "mongoose";
import { WhatsAppGroupsDocument } from "../../models/whatsappGroupModel";
import logger from "../../utils/logger";
import * as whatsappGroupsRepository from "./whatsappGroupRepository";

export const createWhatsAppGroup = async (
    groupData: Partial<WhatsAppGroupsDocument>,
): Promise<WhatsAppGroupsDocument> => {
    try {
        logger.info("Creating WhatsApp group", { groupData });

        const group = await whatsappGroupsRepository.create({
            ...groupData,
            mobilenumbers: groupData.mobilenumbers?.map(
                (number) => number.trim(),
            ) || [],
        });

        logger.info("WhatsApp group created successfully", {
            groupId: group._id,
        });

        return group;
    } catch (error: any) {
        logger.error("Error creating WhatsApp group", {
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to create WhatsApp group",
        );
    }
};

export const getWhatsAppGroupById = async (
    id: string,
): Promise<WhatsAppGroupsDocument | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid WhatsApp group ID");
        }

        return await whatsappGroupsRepository.findById(id);
    } catch (error: any) {
        logger.error("Error getting WhatsApp group", {
            groupId: id,
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to get WhatsApp group",
        );
    }
};

export const getAllWhatsAppGroups = async (): Promise<
    WhatsAppGroupsDocument[]
> => {
    try {
        return await whatsappGroupsRepository.getAllWhatsAppGroups();
    } catch (error: any) {
        logger.error("Error getting WhatsApp groups", {
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to get WhatsApp groups",
        );
    }
};

export const editWhatsAppGroup = async (
    id: string,
    updateData: {
        name?: string;
        addNumbers?: string[];
        removeNumbers?: string[];
    },
): Promise<WhatsAppGroupsDocument | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid WhatsApp group ID");
        }

        const updatedData = {
            ...updateData,
            addNumbers: updateData.addNumbers?.map((number) =>
                number.trim(),
            ),
            removeNumbers: updateData.removeNumbers?.map((number) =>
                number.trim(),
            ),
        };

        const updatedGroup =
            await whatsappGroupsRepository.updateById(
                id,
                updatedData,
            );

        if (!updatedGroup) {
            throw new Error("WhatsApp group not found");
        }

        return updatedGroup;
    } catch (error: any) {
        logger.error("Error updating WhatsApp group", {
            groupId: id,
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to update WhatsApp group",
        );
    }
};

export const deleteWhatsAppGroup = async (
    id: string,
): Promise<WhatsAppGroupsDocument | null> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid WhatsApp group ID");
        }

        const deletedGroup =
            await whatsappGroupsRepository.deleteWhatsAppGroup(id);

        if (!deletedGroup) {
            throw new Error("WhatsApp group not found");
        }

        return deletedGroup;
    } catch (error: any) {
        logger.error("Error deleting WhatsApp group", {
            groupId: id,
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to delete WhatsApp group",
        );
    }
};