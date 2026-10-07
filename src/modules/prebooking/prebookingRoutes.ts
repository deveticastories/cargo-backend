import { Router } from "express";

import {
  createPreBooking,
  getAllPreBookings,
  getPreBookingById,
  editPreBooking,
  deletePreBooking,
  updatePreBookingStatus,
} from "./prebookingController";

import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/pre-bookings:
 *   post:
 *     summary: Create a new pre-booking
 *     tags: [Pre Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePreBookingRequest'
 *     responses:
 *       201:
 *         description: Pre-booking created successfully
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
 *                   example: Pre-booking created successfully
 *                 preBooking:
 *                   $ref: '#/components/schemas/PreBooking'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  verifyToken,
  createPreBooking,
);

/**
 * @swagger
 * /api/pre-bookings:
 *   get:
 *     summary: Get all pre-bookings with summary
 *     tags: [Pre Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pre-bookings with booking and quantity summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 totalPreBookings:
 *                   type: number
 *                   example: 4
 *                   description: Total number of pre-bookings
 *
 *                 totalCollectedBookings:
 *                   type: number
 *                   example: 2
 *                   description: Total number of collected pre-bookings
 *
 *                 collectedBookingList:
 *                   type: array
 *                   description: List of collected pre-bookings only
 *                   items:
 *                     $ref: '#/components/schemas/PreBooking'
 *
 *                 bundle:
 *                   type: number
 *                   example: 20
 *
 *                 box:
 *                   type: number
 *                   example: 10
 *
 *                 cbm:
 *                   type: number
 *                   example: 5
 *
 *                 kg:
 *                   type: number
 *                   example: 0
 *
 *       401:
 *         description: Unauthorized
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  verifyToken,
  getAllPreBookings,
);

/**
 * @swagger
 * /api/pre-bookings/{id}:
 *   get:
 *     summary: Get pre-booking by ID
 *     tags: [Pre Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pre-booking ID
 *     responses:
 *       200:
 *         description: Pre-booking retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 preBooking:
 *                   $ref: '#/components/schemas/PreBooking'
 *       400:
 *         description: Invalid pre-booking ID
 *       404:
 *         description: Pre-booking not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  verifyToken,
  getPreBookingById,
);

/**
 * @swagger
 * /api/pre-bookings/{id}:
 *   put:
 *     summary: Update a pre-booking
 *     tags: [Pre Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pre-booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePreBookingRequest'
 *     responses:
 *       200:
 *         description: Pre-booking updated successfully
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
 *                   example: Pre-booking updated successfully
 *                 preBooking:
 *                   $ref: '#/components/schemas/PreBooking'
 *       400:
 *         description: Invalid pre-booking ID
 *       404:
 *         description: Pre-booking not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  verifyToken,
  editPreBooking,
);

/**
 * @swagger
 * /api/pre-bookings/{id}:
 *   delete:
 *     summary: Delete a pre-booking
 *     tags: [Pre Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pre-booking ID
 *     responses:
 *       200:
 *         description: Pre-booking deleted successfully
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
 *                   example: Pre-booking deleted successfully
 *                 preBooking:
 *                   $ref: '#/components/schemas/PreBooking'
 *       400:
 *         description: Invalid pre-booking ID
 *       404:
 *         description: Pre-booking not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  verifyToken,
  deletePreBooking,
);

/**
 * @swagger
 * /api/pre-bookings/{id}/status:
 *   patch:
 *     summary: Change pre-booking status
 *     tags: [Pre Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pre-booking MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePreBookingStatusRequest'
 *     responses:
 *       200:
 *         description: Pre-booking status updated successfully
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
 *                   example: Pre-booking status updated successfully
 *                 preBooking:
 *                   $ref: '#/components/schemas/PreBooking'
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Pre-booking not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  updatePreBookingStatus,
);

export default router;