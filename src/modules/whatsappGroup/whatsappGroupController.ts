
import { Response } from "express";
import * as whatsappGroupsService from "./whatsappGroupService";
import { RequestWithAuthData } from "../../@types/express";
import { message } from "../../constants/responseMessage";
import { statusCode } from "../../constants/statusCode";

export const createWhatsAppGroup = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
            return;
        }

        const groupData = {
            ...req.body,
            createdBy: req.userId,
        };

        const group =
            await whatsappGroupsService.createWhatsAppGroup(groupData);

        res.status(statusCode.CREATED).json({
            success: true,
            message: "WhatsApp group created successfully",
            data: group,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : message.INTERNAL_SERVER_ERROR,
        });
    }
};

export const getWhatsAppGroupById = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
            return;
        }

        const id = String(req.params.id);

        const group =
            await whatsappGroupsService.getWhatsAppGroupById(id);

        if (!group) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "WhatsApp group not found",
            });
            return;
        }

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp group fetched successfully",
            data: group,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : message.INTERNAL_SERVER_ERROR,
        });
    }
};

export const getAllWhatsAppGroups = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
            return;
        }

        const groups =
            await whatsappGroupsService.getAllWhatsAppGroups();

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp groups fetched successfully",
            data: groups,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : message.INTERNAL_SERVER_ERROR,
        });
    }
};

export const editWhatsAppGroup = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
            return;
        }

        const id = String(req.params.id);

        const updateData = {
            ...req.body,
            updatedBy: req.userId,
            userUpdatedDate: new Date(),
        };

        const group =
            await whatsappGroupsService.editWhatsAppGroup(
                id,
                updateData,
            );

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp group updated successfully",
            data: group,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : message.INTERNAL_SERVER_ERROR,
        });
    }
};

export const deleteWhatsAppGroup = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
            return;
        }

        const id = String(req.params.id);

        await whatsappGroupsService.deleteWhatsAppGroup(id);

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp group deleted successfully",
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : message.INTERNAL_SERVER_ERROR,
        });
    }
};
