import { Router } from "express";

import {
  createFabric,
  editFabric,
  deleteFabric,
  getFabricById,
  getAllFabrics,
  updateFabricStatus,
} from "./fabricConroller";

import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Fabrics
 *   description: Fabric management APIs
 */

/**
 * @swagger
 * /api/fabrics:
 *   post:
 *     summary: Create a fabric
 *     tags:
 *       - Fabrics
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateFabricRequest'
 *     responses:
 *       201:
 *         description: Fabric created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", verifyToken, createFabric);

/**
 * @swagger
 * /api/fabrics:
 *   get:
 *     summary: Get all fabrics
 *     tags:
 *       - Fabrics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fabrics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", verifyToken, getAllFabrics);

/**
 * @swagger
 * /api/fabrics/{id}:
 *   get:
 *     summary: Get fabric by ID
 *     tags:
 *       - Fabrics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fabric ID
 *     responses:
 *       200:
 *         description: Fabric retrieved successfully
 *       400:
 *         description: Invalid fabric ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Fabric not found
 *       500:
 *         description: Server error
 */
router.get("/:id", verifyToken, getFabricById);

/**
 * @swagger
 * /api/fabrics/{id}:
 *   put:
 *     summary: Update a fabric
 *     tags:
 *       - Fabrics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fabric ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFabricRequest'
 *     responses:
 *       200:
 *         description: Fabric updated successfully
 *       400:
 *         description: Invalid fabric ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Fabric not found
 *       500:
 *         description: Server error
 */
router.put("/:id", verifyToken, editFabric);

/**
 * @swagger
 * /api/fabrics/{id}:
 *   delete:
 *     summary: Delete a fabric
 *     tags:
 *       - Fabrics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fabric ID
 *     responses:
 *       200:
 *         description: Fabric deleted successfully
 *       400:
 *         description: Invalid fabric ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Fabric not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", verifyToken, deleteFabric);

/**
 * @swagger
 * /api/fabrics/{id}/status:
 *   patch:
 *     summary: Update fabric status
 *     tags:
 *       - Fabrics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fabric ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFabricStatusRequest'
 *     responses:
 *       200:
 *         description: Fabric status updated successfully
 *       400:
 *         description: Invalid fabric ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Fabric not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  updateFabricStatus,
);

export default router;