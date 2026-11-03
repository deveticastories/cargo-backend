import { Router } from "express";
import * as unitController from "./unitController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Units
 *   description: Unit management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUnit:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Kilogram
 *
 *     UpdateUnit:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Gram
 *
 *     UpdateUnitStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           example: Active
 *
 *     Unit:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 672a1b2c3d4e5f6789012345
 *         name:
 *           type: string
 *           example: Kilogram
 *         status:
 *           type: string
 *           example: Active
 *         isDeleted:
 *           type: boolean
 *           example: false
 *         createdBy:
 *           type: string
 *         updatedBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/units:
 *   post:
 *     summary: Create a new unit
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUnit'
 *     responses:
 *       201:
 *         description: Unit created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, unitController.createUnit);

/**
 * @swagger
 * /api/units:
 *   get:
 *     summary: Get all units
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Units retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 units:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Unit'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, unitController.getAllUnits);

/**
 * @swagger
 * /api/units/{id}:
 *   get:
 *     summary: Get unit by ID
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unit retrieved successfully
 *       400:
 *         description: Invalid unit ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", verifyToken, unitController.getUnitById);

/**
 * @swagger
 * /api/units/{id}:
 *   put:
 *     summary: Update unit details
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUnit'
 *     responses:
 *       200:
 *         description: Unit updated successfully
 *       400:
 *         description: Invalid unit ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyToken, unitController.editUnit);

/**
 * @swagger
 * /api/units/{id}:
 *   delete:
 *     summary: Soft delete a unit
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unit deleted successfully
 *       400:
 *         description: Invalid unit ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, unitController.deleteUnit);

/**
 * @swagger
 * /api/units/{id}/status:
 *   patch:
 *     summary: Update unit status
 *     tags: [Units]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUnitStatus'
 *     responses:
 *       200:
 *         description: Unit status updated successfully
 *       400:
 *         description: Invalid unit ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  unitController.updateUnitStatus,
);

export default router;