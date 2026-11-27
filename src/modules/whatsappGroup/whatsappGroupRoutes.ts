
import { Router } from "express";
import * as whatsappGroupController from "./whatsappGroupController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: WhatsApp Groups
 *   description: WhatsApp group management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     WhatsAppGroup:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665c2f8a9b12345678901234
 *         name:
 *           type: string
 *           example: Kerala Customers
 *         mobilenumbers:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "9876543210"
 *             - "9876543211"
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         createdBy:
 *           type: string
 *           example: 665c2f8a9b12345678901234
 *         updatedBy:
 *           type: string
 *           nullable: true
 *           example: 665c2f8a9b12345678901235
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateWhatsAppGroupRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Kerala Customers
 *         mobilenumbers:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "9876543210"
 *             - "9876543211"
 *
 *     UpdateWhatsAppGroupRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Updated Kerala Customers
 *         addNumbers:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "9876543212"
 *             - "9876543213"
 *         removeNumbers:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - "9876543210"
 *
 *     WhatsAppGroupResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: WhatsApp group fetched successfully
 *         data:
 *           $ref: '#/components/schemas/WhatsAppGroup'
 *
 *     WhatsAppGroupsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: WhatsApp groups fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WhatsAppGroup'
 */

/**
 * @swagger
 * /api/whatsapp-groups:
 *   post:
 *     summary: Create WhatsApp group
 *     tags: [WhatsApp Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWhatsAppGroupRequest'
 *     responses:
 *       201:
 *         description: WhatsApp group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppGroupResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, whatsappGroupController.createWhatsAppGroup);

/**
 * @swagger
 * /api/whatsapp-groups:
 *   get:
 *     summary: Get all WhatsApp groups
 *     tags: [WhatsApp Groups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: WhatsApp groups fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppGroupsResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, whatsappGroupController.getAllWhatsAppGroups);

/**
 * @swagger
 * /api/whatsapp-groups/{id}:
 *   get:
 *     summary: Get WhatsApp group by ID
 *     tags: [WhatsApp Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: WhatsApp group fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppGroupResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: WhatsApp group not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", verifyToken, whatsappGroupController.getWhatsAppGroupById);

/**
 * @swagger
 * /api/whatsapp-groups/{id}:
 *   put:
 *     summary: Update WhatsApp group and manage mobile numbers
 *     tags: [WhatsApp Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWhatsAppGroupRequest'
 *     responses:
 *       200:
 *         description: WhatsApp group updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WhatsAppGroupResponse'
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: WhatsApp group not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyToken, whatsappGroupController.editWhatsAppGroup);

/**
 * @swagger
 * /api/whatsapp-groups/{id}:
 *   delete:
 *     summary: Delete WhatsApp group
 *     tags: [WhatsApp Groups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: WhatsApp group deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: WhatsApp group not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, whatsappGroupController.deleteWhatsAppGroup);

export default router;
