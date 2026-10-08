import { Router } from "express";

import {
  createPackage,
  getAllPackages,
  getPackageById,
  getPackageByBooking,
  updatePackage,
  deletePackage, downloadPackage
} from "./packageController.js";

import verifyToken from "../../middleware/verifyToken";
const router = Router();

/**
 * @swagger
 * /api/packages:
 *   post:
 *     summary: Create a package
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePackageRequest'
 *     responses:
 *       201:
 *         description: Package created successfully
 *       400:
 *         description: Invalid package data
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createPackage);

/**
 * @swagger
 * /api/packages:
 *   get:
 *     summary: Get all packages
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Packages fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 totalPackages:
 *                   type: number
 *                   example: 2
 *                 packageList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, getAllPackages);

/**
 * @swagger
 * /api/packages/booking/{bookingId}:
 *   get:
 *     summary: Get package by booking ID
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Package fetched successfully
 *       400:
 *         description: Invalid booking ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.get(
  "/booking/:bookingId",
  verifyToken,
  getPackageByBooking,
);

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Get package by ID
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Package fetched successfully
 *       400:
 *         description: Invalid package ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
/**
 * @swagger
 * /api/packages/{id}/download:
 *   get:
 *     summary: Download packing list PDF
 *     description: Generates and downloads the packing list PDF for a package.
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Package ID
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Packing list PDF downloaded successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *
 *       400:
 *         description: Invalid package ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid package ID
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *
 *       404:
 *         description: Package not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Package not found
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id/download",
  verifyToken,
  downloadPackage,
);
router.get(
  "/:id",
  verifyToken,
  getPackageById,
);

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     summary: Update package
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePackageRequest'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *       400:
 *         description: Invalid package data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.put(
  "/:id",
  verifyToken,
  updatePackage,
);

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Delete package
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       400:
 *         description: Invalid package ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */
router.delete(
  "/:id",
  verifyToken,
  deletePackage,
);

export default router;