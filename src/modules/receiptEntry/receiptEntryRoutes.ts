
import { Router } from "express";
import * as receiptEntryController from "./receiptEntryController.js";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Receipt Entries
 *   description: Receipt entry management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReceiptEntry:
 *       type: object
 *       required:
 *         - invoice
 *         - receivableAmount
 *         - receivedAmount
 *       properties:
 *         _id:
 *           type: string
 *           example: "671a12345678901234567890"
 *         invoice:
 *           type: string
 *           description: Invoice MongoDB ObjectId
 *           example: "671a12345678901234567891"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-10-14T00:00:00.000Z"
 *         receivableAmount:
 *           type: number
 *           minimum: 0
 *           example: 15000
 *         receivedAmount:
 *           type: number
 *           minimum: 0
 *           example: 10000
 *         balanceAmount:
 *           type: number
 *           description: Calculated as receivableAmount minus receivedAmount
 *           example: 5000
 *         receivedDate:
 *           type: string
 *           format: date-time
 *           example: "2026-10-14T00:00:00.000Z"
 *         deliveryPartnerAmount:
 *           type: number
 *           minimum: 0
 *           example: 500
 *         deliveryPartnerStatus:
 *           type: string
 *           enum: [Pending, Paid]
 *           example: Pending
 *
 *     ReceiptEntryInput:
 *       type: object
 *       required:
 *         - invoice
 *         - receivableAmount
 *         - receivedAmount
 *       properties:
 *         invoice:
 *           type: string
 *           example: "671a12345678901234567891"
 *         date:
 *           type: string
 *           format: date-time
 *         receivableAmount:
 *           type: number
 *           minimum: 0
 *           example: 15000
 *         receivedAmount:
 *           type: number
 *           minimum: 0
 *           example: 10000
 *         receivedDate:
 *           type: string
 *           format: date-time
 *         deliveryPartnerAmount:
 *           type: number
 *           minimum: 0
 *           example: 500
 *         deliveryPartnerStatus:
 *           type: string
 *           enum: [Pending, Paid]
 *
 *     ReceiptEntryResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         receiptEntry:
 *           $ref: '#/components/schemas/ReceiptEntry'
 *
 *     ReceiptEntriesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         totalReceiptEntries:
 *           type: integer
 *           example: 1
 *         receiptEntryList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReceiptEntry'
 *
 *     ReceiptEntryError:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/receipt-entries:
 *   post:
 *     summary: Create a receipt entry
 *     tags: [Receipt Entries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReceiptEntryInput'
 *     responses:
 *       201:
 *         description: Receipt entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReceiptEntryResponse'
 *       400:
 *         description: Invalid invoice ID or amounts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReceiptEntryError'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, receiptEntryController.createReceiptEntry);

/**
 * @swagger
 * /api/receipt-entries:
 *   get:
 *     summary: Get all receipt entries
 *     tags: [Receipt Entries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Receipt entries fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReceiptEntriesResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, receiptEntryController.getAllReceiptEntries);

/**
 * @swagger
 * /api/receipt-entries/{id}:
 *   get:
 *     summary: Get a receipt entry by ID
 *     tags: [Receipt Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receipt entry MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Receipt entry fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReceiptEntryResponse'
 *       400:
 *         description: Invalid receipt entry ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receipt entry not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", verifyToken, receiptEntryController.getReceiptEntryById);

/**
 * @swagger
 * /api/receipt-entries/{id}:
 *   put:
 *     summary: Update a receipt entry
 *     tags: [Receipt Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receipt entry MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               receivableAmount:
 *                 type: number
 *                 minimum: 0
 *               receivedAmount:
 *                 type: number
 *                 minimum: 0
 *               receivedDate:
 *                 type: string
 *                 format: date-time
 *               deliveryPartnerAmount:
 *                 type: number
 *                 minimum: 0
 *               deliveryPartnerStatus:
 *                 type: string
 *                 enum: [Pending, Paid]
 *     responses:
 *       200:
 *         description: Receipt entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReceiptEntryResponse'
 *       400:
 *         description: Invalid ID, invoice ID, amounts, or update data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receipt entry not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyToken, receiptEntryController.editReceiptEntry);

/**
 * @swagger
 * /api/receipt-entries/{id}:
 *   delete:
 *     summary: Soft delete a receipt entry
 *     tags: [Receipt Entries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receipt entry MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Receipt entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReceiptEntryResponse'
 *       400:
 *         description: Invalid receipt entry ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receipt entry not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, receiptEntryController.deleteReceiptEntry);
/**
 * @swagger
 * /api/receipt-entries/{id}/delivery-partner-status:
 *   patch:
 *     summary: Change delivery partner payment status
 *     tags:
 *       - Receipt Entries
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Receipt entry MongoDB ObjectId
 *         schema:
 *           type: string
 *           example: "665c2f8a9b12345678901234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - deliveryPartnerStatus
 *             properties:
 *               deliveryPartnerStatus:
 *                 type: string
 *                 enum:
 *                   - Pending
 *                   - Paid
 *                 example: Paid
 *     responses:
 *       200:
 *         description: Delivery partner status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Delivery partner status updated successfully
 *                 receiptEntry:
 *                   $ref: "#/components/schemas/ReceiptEntry"
 *       400:
 *         description: Invalid receipt entry ID or delivery partner status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Receipt entry not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/delivery-partner-status",
  verifyToken,
  receiptEntryController.changeDeliveryPartnerStatus,
);



export default router;
