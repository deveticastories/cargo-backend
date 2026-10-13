
import { Router } from "express";
import {
  createCreditNote,
  getAllCreditNotes,
  getCreditNoteById,
  editCreditNote,
  deleteCreditNote,
} from "./creditNoteController.js";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/credit-notes:
 *   post:
 *     summary: Create a new credit note
 *     tags:
 *       - Credit Notes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCreditNoteRequest'
 *     responses:
 *       201:
 *         description: Credit note created successfully
 *       400:
 *         description: Invalid credit note amount
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, createCreditNote);

/**
 * @swagger
 * /api/credit-notes:
 *   get:
 *     summary: Get all credit notes
 *     tags:
 *       - Credit Notes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Credit notes fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, getAllCreditNotes);

/**
 * @swagger
 * /api/credit-notes/{id}:
 *   get:
 *     summary: Get credit note by ID
 *     tags:
 *       - Credit Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit Note MongoDB ID
 *     responses:
 *       200:
 *         description: Credit note retrieved successfully
 *       400:
 *         description: Invalid credit note ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Credit note not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", verifyToken, getCreditNoteById);

/**
 * @swagger
 * /api/credit-notes/{id}:
 *   put:
 *     summary: Edit credit note
 *     tags:
 *       - Credit Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit Note MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCreditNoteRequest'
 *     responses:
 *       200:
 *         description: Credit note updated successfully
 *       400:
 *         description: Invalid credit note ID or request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Credit note not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyToken, editCreditNote);

/**
 * @swagger
 * /api/credit-notes/{id}:
 *   delete:
 *     summary: Delete credit note
 *     description: Soft-delete a credit note and record the deleting user.
 *     tags:
 *       - Credit Notes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit Note MongoDB ID
 *     responses:
 *       200:
 *         description: Credit note deleted successfully
 *       400:
 *         description: Invalid credit note ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Credit note not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, deleteCreditNote);

export default router;
