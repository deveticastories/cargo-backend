
import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import * as deliveryAssignController from "./deliveryAssignCoontroiller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDeliveryAssignRequest:
 *       type: object
 *       required:
 *         - booking
 *         - deliveryPartner
 *         - lrNumber
 *         - expectedDeliveryDate
 *         - amount
 *       properties:
 *         booking:
 *           type: string
 *           example: "665c2f8a9b12345678901234"
 *         deliveryPartner:
 *           type: string
 *           example: "665c2f8a9b12345678901235"
 *         lrNumber:
 *           type: string
 *           example: "LR-2026-001"
 *         expectedDeliveryDate:
 *           type: string
 *           format: date-time
 *           example: "2026-11-30T10:00:00.000Z"
 *         amount:
 *           type: number
 *           minimum: 0
 *           example: 1500
 *
 *     UpdateDeliveryAssignRequest:
 *       type: object
 *       properties:
 *         booking:
 *           type: string
 *           example: "665c2f8a9b12345678901234"
 *         deliveryPartner:
 *           type: string
 *           example: "665c2f8a9b12345678901235"
 *         lrNumber:
 *           type: string
 *           example: "LR-2026-001"
 *         expectedDeliveryDate:
 *           type: string
 *           format: date-time
 *           example: "2026-11-30T10:00:00.000Z"
 *         amount:
 *           type: number
 *           minimum: 0
 *           example: 1500
 *
 *     UpdateDeliveryAssignStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/delivery-assigns:
 *   post:
 *     summary: Create a delivery assignment
 *     tags:
 *       - Delivery Assigns
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateDeliveryAssignRequest"
 *     responses:
 *       201:
 *         description: Delivery assignment created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  verifyToken,
  deliveryAssignController.createDeliveryAssign,
);

/**
 * @swagger
 * /api/delivery-assigns:
 *   get:
 *     summary: Get all delivery assignments
 *     tags:
 *       - Delivery Assigns
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery assignments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  verifyToken,
  deliveryAssignController.getAllDeliveryAssigns,
);

/**
 * @swagger
 * /api/delivery-assigns/{id}:
 *   get:
 *     summary: Get delivery assignment by ID
 *     tags:
 *       - Delivery Assigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery assignment ID
 *         schema:
 *           type: string
 *         example: "665c2f8a9b12345678901234"
 *     responses:
 *       200:
 *         description: Delivery assignment retrieved successfully
 *       400:
 *         description: Invalid delivery assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery assignment not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  verifyToken,
  deliveryAssignController.getDeliveryAssignById,
);

/**
 * @swagger
 * /api/delivery-assigns/{id}:
 *   put:
 *     summary: Update delivery assignment
 *     tags:
 *       - Delivery Assigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery assignment ID
 *         schema:
 *           type: string
 *         example: "665c2f8a9b12345678901234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateDeliveryAssignRequest"
 *     responses:
 *       200:
 *         description: Delivery assignment updated successfully
 *       400:
 *         description: Invalid delivery assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery assignment not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  verifyToken,
  deliveryAssignController.editDeliveryAssign,
);

/**
 * @swagger
 * /api/delivery-assigns/{id}:
 *   delete:
 *     summary: Delete delivery assignment
 *     tags:
 *       - Delivery Assigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery assignment ID
 *         schema:
 *           type: string
 *         example: "665c2f8a9b12345678901234"
 *     responses:
 *       200:
 *         description: Delivery assignment deleted successfully
 *       400:
 *         description: Invalid delivery assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery assignment not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  verifyToken,
  deliveryAssignController.deleteDeliveryAssign,
);

/**
 * @swagger
 * /api/delivery-assigns/{id}/status:
 *   patch:
 *     summary: Update delivery assignment status
 *     tags:
 *       - Delivery Assigns
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery assignment ID
 *         schema:
 *           type: string
 *         example: "665c2f8a9b12345678901234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateDeliveryAssignStatusRequest"
 *     responses:
 *       200:
 *         description: Delivery assignment status updated successfully
 *       400:
 *         description: Invalid delivery assignment ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery assignment not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  deliveryAssignController.updateDeliveryAssignStatus,
);

export default router;
