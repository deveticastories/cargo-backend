import { Response, Request } from "express";
import twilio from "twilio";
import * as whatsappMessageService from "./whatsappMessageService";
import { RequestWithAuthData } from "../../@types/express";
import { statusCode } from "../../constants/statusCode";
import logger from "../../utils/logger";

export const sendWhatsAppMessage = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const { groupIds, message } = req.body;

        const campaign =
            await whatsappMessageService.sendWhatsAppMessage(
                groupIds,
                message,
                req.userId,
            );

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp messages sent successfully",
            data: campaign,
        });
    } catch (error: unknown) {
        logger.error("Send WhatsApp message controller error", {
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error",
        });

        res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to send WhatsApp messages",
        });
    }
};

export const getWhatsAppMessageHistory = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const campaigns =
            await whatsappMessageService.getWhatsAppMessageHistory();

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp message history fetched successfully",
            data: campaigns,
        });
    } catch (error: unknown) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch WhatsApp message history",
        });
    }
};

export const getWhatsAppMessageById = async (
    req: RequestWithAuthData,
    res: Response,
): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const id = String(req.params.id);

        const campaign =
            await whatsappMessageService.getWhatsAppMessageById(id);

        if (!campaign) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "WhatsApp campaign not found",
            });
            return;
        }

        res.status(statusCode.OK).json({
            success: true,
            message: "WhatsApp campaign fetched successfully",
            data: campaign,
        });
    } catch (error: unknown) {
        res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to fetch WhatsApp campaign",
        });
    }
};

export const whatsappStatusCallback = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const signature = req.headers["x-twilio-signature"] as
            | string
            | undefined;

        if (!authToken || !signature) {
            res.sendStatus(403);
            return;
        }

        const webhookUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

        const isValid = twilio.validateRequest(
            authToken,
            signature,
            webhookUrl,
            req.body,
        );

        if (!isValid) {
            res.sendStatus(403);
            return;
        }

        const {
            MessageSid,
            MessageStatus,
            ErrorMessage,
            ErrorCode,
        } = req.body;

        if (!MessageSid || !MessageStatus) {
            res.sendStatus(400);
            return;
        }

        await whatsappMessageService.updateWhatsAppDeliveryStatus(
            MessageSid,
            MessageStatus,
            ErrorMessage ||
            (ErrorCode ? `Twilio error code: ${ErrorCode}` : undefined),
        );

        res.sendStatus(200);
    } catch (error: unknown) {
        logger.error("Twilio status callback error", {
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown error",
        });

        res.sendStatus(500);
    }
};