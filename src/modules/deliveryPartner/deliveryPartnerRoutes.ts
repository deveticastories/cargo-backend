import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";
import * as deliveryPartnerController from "./deliveryPartnerController";

const router = Router();

/**
 * @swagger
 * /api/delivery-partners:
 *   post:
 *     summary: Create a delivery partner
 *     tags:
 *       - Delivery Partners
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateDeliveryPartnerRequest"
 *     responses:
 *       201:
 *         description: Delivery partner created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  verifyToken,
  deliveryPartnerController.createDeliveryPartner,
);

/**
 * @swagger
 * /api/delivery-partners:
 *   get:
 *     summary: Get all delivery partners
 *     tags:
 *       - Delivery Partners
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery partners retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  verifyToken,
  deliveryPartnerController.getAllDeliveryPartners,
);

/**
 * @swagger
 * /api/delivery-partners/{id}:
 *   get:
 *     summary: Get delivery partner by ID
 *     tags:
 *       - Delivery Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Delivery partner retrieved successfully
 *       400:
 *         description: Invalid delivery partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  verifyToken,
  deliveryPartnerController.getDeliveryPartnerById,
);

/**
 * @swagger
 * /api/delivery-partners/{id}:
 *   put:
 *     summary: Update delivery partner
 *     tags:
 *       - Delivery Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateDeliveryPartnerRequest"
 *     responses:
 *       200:
 *         description: Delivery partner updated successfully
 *       400:
 *         description: Invalid delivery partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  verifyToken,
  deliveryPartnerController.editDeliveryPartner,
);

/**
 * @swagger
 * /api/delivery-partners/{id}:
 *   delete:
 *     summary: Delete delivery partner
 *     tags:
 *       - Delivery Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Delivery partner deleted successfully
 *       400:
 *         description: Invalid delivery partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  verifyToken,
  deliveryPartnerController.deleteDeliveryPartner,
);

/**
 * @swagger
 * /api/delivery-partners/{id}/status:
 *   patch:
 *     summary: Update delivery partner status
 *     tags:
 *       - Delivery Partners
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Delivery partner ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateDeliveryPartnerStatusRequest"
 *     responses:
 *       200:
 *         description: Delivery partner status updated successfully
 *       400:
 *         description: Invalid delivery partner ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  deliveryPartnerController.updateDeliveryPartnerStatus,
);

export default router;