import { Router } from "express";
import * as walletController from "./walletController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/wallet/add:
 *   post:
 *     summary: Add money to a pickup partner's wallet
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "65f123456789abcdef123456"
 *                 description: Pickup partner user ID
 *               amount:
 *                 type: number
 *                 example: 100
 *                 description: Positive amount to add to the wallet
 *               description:
 *                 type: string
 *                 example: "Initial wallet amount"
 *     responses:
 *       200:
 *         description: Wallet balance added successfully
 *       400:
 *         description: Invalid pickup partner ID or wallet amount
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/add", verifyToken, walletController.addWalletMoney);

/**
 * @swagger
 * /api/wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/balance", verifyToken, walletController.getWalletBalance);

/**
 * @swagger
 * /api/wallet/transactions:
 *   get:
 *     summary: Get wallet transaction history
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Number of transactions per page
 *     responses:
 *       200:
 *         description: Wallet transaction history fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
    "/transactions",
    verifyToken,
    walletController.getWalletTransactionHistory,
);

export default router;