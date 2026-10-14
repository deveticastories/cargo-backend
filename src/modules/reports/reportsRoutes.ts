
import { Router } from "express";

import {
    getBookingReportsController,
    getContainerStuffingReport,
    getCustomerWiseStuffedReport, getCountryWiseStuffedReport
    ,
} from "./reportsController";

import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Booking and container stuffing report APIs
 */

/**
 * @swagger
 * /api/reports/booking-reports:
 *   get:
 *     summary: Get booking report
 *     description: Filter bookings by creation month, year, packing status, and package-list status.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Filter by month (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by year
 *       - in: query
 *         name: packingStatus
 *         schema:
 *           type: string
 *           enum: ["Ready to Ship", "Repacking Required"]
 *         description: Filter by packing status
 *       - in: query
 *         name: packageListStatus
 *         schema:
 *           type: string
 *           enum: ["Added", "Pending"]
 *         description: Filter by package-list status
 *     responses:
 *       200:
 *         description: Booking report fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch booking report
 */
router.get(
    "/booking-reports",
    verifyToken,
    getBookingReportsController,
);

/**
 * @swagger
 * /api/reports/container-reports:
 *   get:
 *     summary: Get container stuffing report
 *     description: Retrieve container details, stuffing dates, associated bookings, and stuffed booking counts.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Container stuffing report fetched successfully
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
 *                   example: Container stuffing report fetched successfully
 *                 totalContainers:
 *                   type: integer
 *                   example: 2
 *                 totalStuffedBookings:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       container:
 *                         type: object
 *                         description: Populated container details
 *                       stuffingDates:
 *                         type: array
 *                         items:
 *                           type: string
 *                           format: date-time
 *                       totalBookings:
 *                         type: integer
 *                         example: 4
 *                       totalStuffedBookings:
 *                         type: integer
 *                         example: 3
 *                       bookings:
 *                         type: array
 *                         description: Associated populated booking details
 *                         items:
 *                           $ref: '#/components/schemas/Reports'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch container stuffing report
 */
router.get(
    "/container-reports",
    verifyToken,
    getContainerStuffingReport,
);



/**
 * @swagger
 * /api/reports/country-wise-stuffed:
 *   get:
 *     summary: Get country-wise stuffed booking report
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Country-wise stuffed booking report fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch report
 */
router.get(
    "/country-wise-stuffed",
    verifyToken,
    getCountryWiseStuffedReport,
);

/**
 * @swagger
 * /api/reports/customer-wise-stuffed:
 *   get:
 *     summary: Get customer-wise stuffed booking report
 *     description: Lists stuffed booking numbers grouped by receiver customer WhatsApp number.
 *     tags:
 *       - Reports
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer-wise stuffed booking report fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch report
 */
router.get(
    "/customer-wise-stuffed",
    verifyToken,
    getCustomerWiseStuffedReport,
);


export default router;
