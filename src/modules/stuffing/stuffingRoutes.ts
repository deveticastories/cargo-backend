
import { Router } from "express";
import verifyToken from "../../middleware/verifyToken.js";

import {
  createStuffing,
  getAllStuffings,
  getStuffingById,
} from "./stuffingController.js";

const router = Router();

/**
 * @swagger
 * /api/stuffings:
 *   post:
 *     summary: Create a stuffing record
 *     tags:
 *       - Stuffings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStuffingRequest'
 *     responses:
 *       201:
 *         description: Stuffing created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createStuffing);

/**
 * @swagger
 * /api/stuffings:
 *   get:
 *     summary: Get all stuffing records
 *     tags:
 *       - Stuffings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stuffing records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalStuffings:
 *                   type: number
 *                   example: 2
 *                 stuffingList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Stuffing'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, getAllStuffings);

/**
 * @swagger
 * /api/stuffings/{id}:
 *   get:
 *     summary: Get stuffing by ID
 *     tags:
 *       - Stuffings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Stuffing ObjectId
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Stuffing fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Stuffing'
 *       400:
 *         description: Invalid stuffing ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Stuffing not found
 */
router.get("/:id", verifyToken, getStuffingById);

export default router;

