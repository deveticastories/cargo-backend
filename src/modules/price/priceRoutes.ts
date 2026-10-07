import { Router } from "express";
import {
  createPricing,
  editPricing,
  deletePricing,
  getPricingById,
  getAllPricings,
} from "./priceController.js";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Pricing management APIs
 */

/**
 * @swagger
 * /api/pricing:
 *   post:
 *     summary: Create pricing
 *     tags:
 *       - Pricing
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePricingRequest'
 *     responses:
 *       201:
 *         description: Pricing created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", verifyToken, createPricing);

/**
 * @swagger
 * /api/pricing:
 *   get:
 *     summary: Get all pricing
 *     tags:
 *       - Pricing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pricing retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", verifyToken, getAllPricings);

/**
 * @swagger
 * /api/pricing/{id}:
 *   get:
 *     summary: Get pricing by ID
 *     tags:
 *       - Pricing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pricing ID
 *     responses:
 *       200:
 *         description: Pricing retrieved successfully
 *       400:
 *         description: Invalid pricing ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pricing not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, getPricingById);

/**
 * @swagger
 * /api/pricing/{id}:
 *   put:
 *     summary: Update pricing
 *     tags:
 *       - Pricing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pricing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePricingRequest'
 *     responses:
 *       200:
 *         description: Pricing updated successfully
 *       400:
 *         description: Invalid pricing ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pricing not found
 *       500:
 *         description: Server error
 */
router.put("/:id", verifyToken, editPricing);

/**
 * @swagger
 * /api/pricing/{id}:
 *   delete:
 *     summary: Delete pricing
 *     tags:
 *       - Pricing
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pricing ID
 *     responses:
 *       200:
 *         description: Pricing deleted successfully
 *       400:
 *         description: Invalid pricing ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pricing not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", verifyToken, deletePricing);

export default router;