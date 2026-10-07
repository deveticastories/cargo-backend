import { Router } from "express";

import {
  createPickupAssign,
  editPickupAssign,
  deletePickupAssign,
  getPickupAssignById,
  getAllPickupAssigns,
  updatePickupAssignStatus,
  updatePaymentStatus,
  markCollected,
} from "./pickupAssignController.js";

import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Pickup Assigns
 *     description: Pickup assignment management APIs
 */

/**
 * @swagger
 * /api/pickup-assigns:
 *   post:
 *     summary: Create pickup assignment
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePickupAssignRequest'
 *     responses:
 *       201:
 *         description: Pickup assign created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", verifyToken, createPickupAssign);

/**
 * @swagger
 * /api/pickup-assigns:
 *   get:
 *     summary: Get all pickup assignments
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pickup assignments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 pickupAssigns:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PickupAssign'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", verifyToken, getAllPickupAssigns);

/**
 * @swagger
 * /api/pickup-assigns/{id}:
 *   get:
 *     summary: Get pickup assignment by ID
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pickup assignment ID
 *     responses:
 *       200:
 *         description: Pickup assignment retrieved successfully
 *       400:
 *         description: Invalid pickup assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup assignment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, getPickupAssignById);

/**
 * @swagger
 * /api/pickup-assigns/{id}:
 *   put:
 *     summary: Update pickup assignment
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pickup assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePickupAssignRequest'
 *     responses:
 *       200:
 *         description: Pickup assignment updated successfully
 *       400:
 *         description: Invalid pickup assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup assignment not found
 *       500:
 *         description: Server error
 */
router.put("/:id", verifyToken, editPickupAssign);

/**
 * @swagger
 * /api/pickup-assigns/{id}:
 *   delete:
 *     summary: Delete pickup assignment
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pickup assignment ID
 *     responses:
 *       200:
 *         description: Pickup assignment deleted successfully
 *       400:
 *         description: Invalid pickup assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup assignment not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", verifyToken, deletePickupAssign);

/**
 * @swagger
 * /api/pickup-assigns/{id}/status:
 *   patch:
 *     summary: Update pickup assignment status
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pickup assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePickupAssignStatusRequest'
 *     responses:
 *       200:
 *         description: Pickup assignment status updated successfully
 *       400:
 *         description: Invalid pickup assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup assignment not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  updatePickupAssignStatus,
);

/**
 * @swagger
 * /api/pickup-assigns/{id}/payment-status:
 *   patch:
 *     summary: Update pickup assignment payment status
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pickup assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePickupPaymentStatusRequest'
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *       400:
 *         description: Invalid pickup assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup assignment not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/:id/payment-status",
  verifyToken,
  updatePaymentStatus,
);

/**
 * @swagger
 * /api/pickup-assigns/{id}/collected:
 *   patch:
 *     summary: Mark pickup assignment as collected
 *     tags: [Pickup Assigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pickup assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MarkPickupCollectedRequest'
 *     responses:
 *       200:
 *         description: Pickup assignment marked as collected
 *       400:
 *         description: Invalid pickup assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup assignment not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/:id/collected",
  verifyToken,
  markCollected,
);

export default router;