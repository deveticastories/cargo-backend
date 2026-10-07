import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import * as pickupPartnerController from "./pickupPartnerController";

const router = Router();

/**
 * @swagger
 * /api/pickup-partners:
 *   post:
 *     summary: Create a pickup partner
 *     tags:
 *       - Pickup Partners
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreatePickupPartnerRequest"
 *     responses:
 *       201:
 *         description: Pickup partner created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  verifyToken,
  pickupPartnerController.createPickupPartner,
);

/**
 * @swagger
 * /api/pickup-partners:
 *   get:
 *     summary: Get all pickup partners
 *     tags:
 *       - Pickup Partners
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pickup partners retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  verifyToken,
  pickupPartnerController.getAllPickupPartners,
);

/**
 * @swagger
 * /api/pickup-partners/{id}:
 *   get:
 *     summary: Get pickup partner by ID
 *     tags:
 *       - Pickup Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Pickup partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Pickup partner retrieved successfully
 *       400:
 *         description: Invalid pickup partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup partner not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  verifyToken,
  pickupPartnerController.getPickupPartnerById,
);

/**
 * @swagger
 * /api/pickup-partners/{id}:
 *   put:
 *     summary: Update pickup partner
 *     tags:
 *       - Pickup Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Pickup partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdatePickupPartnerRequest"
 *     responses:
 *       200:
 *         description: Pickup partner updated successfully
 *       400:
 *         description: Invalid pickup partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup partner not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  verifyToken,
  pickupPartnerController.editPickupPartner,
);

/**
 * @swagger
 * /api/pickup-partners/{id}:
 *   delete:
 *     summary: Delete pickup partner
 *     tags:
 *       - Pickup Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Pickup partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Pickup partner deleted successfully
 *       400:
 *         description: Invalid pickup partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup partner not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  verifyToken,
  pickupPartnerController.deletePickupPartner,
);

/**
 * @swagger
 * /api/pickup-partners/{id}/status:
 *   patch:
 *     summary: Update pickup partner status
 *     tags:
 *       - Pickup Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Pickup partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdatePickupPartnerStatusRequest"
 *     responses:
 *       200:
 *         description: Pickup partner status updated successfully
 *       400:
 *         description: Invalid pickup partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pickup partner not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  pickupPartnerController.updatePickupPartnerStatus,
);

export default router;