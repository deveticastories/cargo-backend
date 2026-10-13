
import { Router } from "express";
import {
  createDailyExpense,
  getAllDailyExpenses,
  getDailyExpenseById,
  editDailyExpense,
  deleteDailyExpense,
} from "./dailyExpenseController.js";
import verifyToken from "../../middleware/verifyToken.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Daily Expenses
 *   description: Daily operational expense management
 */

/**
 * @swagger
 * /api/daily-expenses:
 *   post:
 *     summary: Create a daily expense
 *     tags: [Daily Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDailyExpenseRequest'
 *     responses:
 *       201:
 *         description: Daily expense created successfully
 *       400:
 *         description: Invalid daily expense data
 *       401:
 *         description: Unauthorized
 */
router.post("/", verifyToken, createDailyExpense);

/**
 * @swagger
 * /api/daily-expenses:
 *   get:
 *     summary: Get all daily expenses
 *     tags: [Daily Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily expenses fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, getAllDailyExpenses);

/**
 * @swagger
 * /api/daily-expenses/{id}:
 *   get:
 *     summary: Get a daily expense by ID
 *     tags: [Daily Expenses]
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
 *         description: Daily expense fetched successfully
 *       400:
 *         description: Invalid daily expense ID
 *       404:
 *         description: Daily expense not found
 */
router.get("/:id", verifyToken, getDailyExpenseById);

/**
 * @swagger
 * /api/daily-expenses/{id}:
 *   put:
 *     summary: Edit a daily expense
 *     tags: [Daily Expenses]
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
 *             $ref: '#/components/schemas/UpdateDailyExpenseRequest'
 *     responses:
 *       200:
 *         description: Daily expense updated successfully
 *       400:
 *         description: Invalid update data
 *       404:
 *         description: Daily expense not found
 */
router.put("/:id", verifyToken, editDailyExpense);

/**
 * @swagger
 * /api/daily-expenses/{id}:
 *   delete:
 *     summary: Soft delete a daily expense
 *     tags: [Daily Expenses]
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
 *         description: Daily expense deleted successfully
 *       400:
 *         description: Invalid daily expense ID
 *       404:
 *         description: Daily expense not found
 */
router.delete("/:id", verifyToken, deleteDailyExpense);

export default router;
