import { Router } from "express";
import * as storeController from "./storeController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: Create a store
 *     tags:
 *       - Stores
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateStoreRequest"
 *     responses:
 *       201:
 *         description: Store created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  verifyToken,
  storeController.createStore,
);

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores
 *     tags:
 *       - Stores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stores retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  verifyToken,
  storeController.getAllStores,
);

/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags:
 *       - Stores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Store ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Store retrieved successfully
 *       400:
 *         description: Invalid store ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  verifyToken,
  storeController.getStoreById,
);

/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Update store
 *     tags:
 *       - Stores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Store ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateStoreRequest"
 *     responses:
 *       200:
 *         description: Store updated successfully
 *       400:
 *         description: Invalid store ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  verifyToken,
  storeController.editStore,
);

/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Delete store
 *     tags:
 *       - Stores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Store ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *       400:
 *         description: Invalid store ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  verifyToken,
  storeController.deleteStore,
);

/**
 * @swagger
 * /api/stores/{id}/status:
 *   patch:
 *     summary: Update store status
 *     tags:
 *       - Stores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Store ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateStoreStatusRequest"
 *     responses:
 *       200:
 *         description: Store status updated successfully
 *       400:
 *         description: Invalid store ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Store not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  storeController.updateStoreStatus,
);

export default router;