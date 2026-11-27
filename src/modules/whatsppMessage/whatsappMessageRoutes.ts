
import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import * as whatsappMessageController from "./whatsappMessageController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: WhatsApp Messages
 *   description: WhatsApp bulk messaging and campaign management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WhatsAppRecipient:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "+919876543210"
 *         deliveryStatus:
 *           type: string
 *           enum: [Pending, Queued, Sending, Sent, Delivered, Read, Failed, Undelivered]
 *           example: Sent
 *         messageSid:
 *           type: string
 *           example: "SM123456789abcdef"
 *         errorMessage:
 *           type: string
 *           example: "Invalid WhatsApp number"
 *
 *     WhatsAppMessage:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "674abc123456789012345680"
 *         groupIds:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "674abc123456789012345678"
 *         message:
 *           type: string
 *           example: "Happy Onam!"
 *         totalRecipients:
 *           type: number
 *           example: 100
 *         sentCount:
 *           type: number
 *           example: 95
 *         failedCount:
 *           type: number
 *           example: 5
 *         campaignStatus:
 *           type: string
 *           enum: [Processing, Completed, Partially Failed, Failed]
 *           example: Partially Failed
 *         recipients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WhatsAppRecipient'
 *
 *     SendWhatsAppMessageRequest:
 *       type: object
 *       required:
 *         - groupIds
 *         - message
 *       properties:
 *         groupIds:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "674abc123456789012345678"
 *             - "674abc123456789012345679"
 *         message:
 *           type: string
 *           example: "Happy Onam! Wishing you and your family happiness."
 *
 *     WhatsAppMessageResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "WhatsApp message sent successfully"
 *         data:
 *           $ref: '#/components/schemas/WhatsAppMessage'
 *
 *     WhatsAppMessagesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "WhatsApp message history fetched successfully"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WhatsAppMessage'
 */

/**
 * @swagger
 * /api/whatsapp-messages/send:
 *   post:
 *     summary: Send WhatsApp bulk message
 *     tags: [WhatsApp Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendWhatsAppMessageRequest'
 *     responses:
 *       200:
 *         description: WhatsApp messages processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppMessageResponse'
 *       400:
 *         description: Invalid request or failed campaign
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/send",
    verifyToken,
    whatsappMessageController.sendWhatsAppMessage,
);

/**
 * @swagger
 * /api/whatsapp-messages/history:
 *   get:
 *     summary: Get WhatsApp message campaign history
 *     tags: [WhatsApp Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: WhatsApp message history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppMessagesResponse'
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/history",
    verifyToken,
    whatsappMessageController.getWhatsAppMessageHistory,
);

/**
 * @swagger
 * /api/whatsapp-messages/{id}:
 *   get:
 *     summary: Get WhatsApp campaign details
 *     tags: [WhatsApp Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: WhatsApp campaign ID
 *     responses:
 *       200:
 *         description: WhatsApp campaign fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppMessageResponse'
 *       400:
 *         description: Invalid campaign ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: WhatsApp campaign not found
 */
router.get(
    "/:id",
    verifyToken,
    whatsappMessageController.getWhatsAppMessageById,
);

/**
 * @swagger
 * /api/whatsapp-messages/status:
 *   post:
 *     summary: Twilio WhatsApp delivery status callback
 *     tags: [WhatsApp Messages]
 *     description: Public webhook endpoint called by Twilio to update message delivery status. Twilio request signature is validated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               MessageSid:
 *                 type: string
 *                 example: "SM123456789abcdef"
 *               MessageStatus:
 *                 type: string
 *                 example: delivered
 *               ErrorCode:
 *                 type: string
 *                 example: "63016"
 *               ErrorMessage:
 *                 type: string
 *                 example: "Message failed"
 *     responses:
 *       200:
 *         description: Status callback processed successfully
 *       400:
 *         description: Invalid callback
 *       403:
 *         description: Invalid Twilio signature
 *       500:
 *         description: Internal server error
 */
router.post(
    "/status",
    whatsappMessageController.whatsappStatusCallback,
);

export default router;
