
import { Router } from "express";
import * as invoiceController from "./invoiceController.js";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management APIs
 */

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - container
 *               - booking
 *               - deliveryPartner
 *             properties:
 *               container:
 *                 type: string
 *                 example: "66f123456789abcdef123456"
 *               booking:
 *                 type: string
 *                 example: "66f123456789abcdef123457"
 *               deliveryPartner:
 *                 type: string
 *                 example: "66f123456789abcdef123458"
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Invalid input or invoice creation failed
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, invoiceController.createInvoice);

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invoice list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to retrieve invoices
 */
router.get("/", verifyToken, invoiceController.getAllInvoices);

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Get an invoice by ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *       400:
 *         description: Invalid invoice ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Failed to retrieve invoice
 */
router.get("/:id", verifyToken, invoiceController.getInvoiceById);

export default router;
