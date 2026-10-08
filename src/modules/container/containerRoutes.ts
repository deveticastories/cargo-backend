import { Router } from "express";
import verifyToken from "../../middleware/verifyToken";

import {
  createContainer,
  getAllContainers,
  getContainerById,
  updateContainer,
  deleteContainer,
  updateContainerStatus,
} from "./containerController.js";

const router = Router();

/**
 * @swagger
 * /api/containers:
 *   post:
 *     summary: Create a container
 *     tags:
 *       - Containers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContainerRequest'
 *     responses:
 *       201:
 *         description: Container created successfully
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
 *                   example: Container created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Container'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createContainer);

/**
 * @swagger
 * /api/containers:
 *   get:
 *     summary: Get all containers
 *     tags:
 *       - Containers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Containers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalContainers:
 *                   type: number
 *                   example: 5
 *                 containerList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Container'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, getAllContainers);

/**
 * @swagger
 * /api/containers/{id}:
 *   get:
 *     summary: Get container by ID
 *     tags:
 *       - Containers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Container ObjectId
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Container fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Container'
 *       400:
 *         description: Invalid container ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Container not found
 */
router.get("/:id", verifyToken, getContainerById);

/**
 * @swagger
 * /api/containers/{id}:
 *   put:
 *     summary: Update container
 *     tags:
 *       - Containers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Container ObjectId
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateContainerRequest'
 *     responses:
 *       200:
 *         description: Container updated successfully
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
 *                   example: Container updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Container'
 *       400:
 *         description: Invalid container ID or bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Container not found
 */
router.put("/:id", verifyToken, updateContainer);

/**
 * @swagger
 * /api/containers/{id}:
 *   delete:
 *     summary: Delete container
 *     tags:
 *       - Containers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Container ObjectId
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Container deleted successfully
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
 *                   example: Container deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Container'
 *       400:
 *         description: Invalid container ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Container not found
 */
router.delete("/:id", verifyToken, deleteContainer);

/**
 * @swagger
 * /api/containers/{id}/status:
 *   patch:
 *     summary: Update container status
 *     tags:
 *       - Containers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Container ObjectId
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateContainerStatusRequest'
 *     responses:
 *       200:
 *         description: Container status updated successfully
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
 *                   example: Container status updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Container'
 *       400:
 *         description: Invalid container ID or container status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Container not found
 */
router.patch(
  "/:id/status",
  verifyToken,
  updateContainerStatus,
);

export default router;