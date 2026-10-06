import { Router } from "express";
import * as countryController from "./countryController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * /api/countries:
 *   post:
 *     summary: Create a country
 *     tags:
 *       - Countries
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateCountryRequest"
 *     responses:
 *       201:
 *         description: Country created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  verifyToken,
  countryController.createCountry,
);

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all countries
 *     tags:
 *       - Countries
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Countries retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  verifyToken,
  countryController.getAllCountries,
);

/**
 * @swagger
 * /api/countries/{id}:
 *   get:
 *     summary: Get country by ID
 *     tags:
 *       - Countries
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Country retrieved successfully
 *       400:
 *         description: Invalid country ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  verifyToken,
  countryController.getCountryById,
);

/**
 * @swagger
 * /api/countries/{id}:
 *   put:
 *     summary: Update country
 *     tags:
 *       - Countries
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateCountryRequest"
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       400:
 *         description: Invalid country ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  verifyToken,
  countryController.editCountry,
);

/**
 * @swagger
 * /api/countries/{id}:
 *   delete:
 *     summary: Delete country
 *     tags:
 *       - Countries
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       400:
 *         description: Invalid country ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  verifyToken,
  countryController.deleteCountry,
);

/**
 * @swagger
 * /api/countries/{id}/status:
 *   patch:
 *     summary: Update country status
 *     tags:
 *       - Countries
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Country ID
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateCountryStatusRequest"
 *     responses:
 *       200:
 *         description: Country status updated successfully
 *       400:
 *         description: Invalid country ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Country not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id/status",
  verifyToken,
  countryController.updateCountryStatus,
);

export default router;