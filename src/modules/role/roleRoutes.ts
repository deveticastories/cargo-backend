
import { Router } from "express";
import * as roleController from "./roleController";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 665c2f8a9b12345678901234
 *         roleName:
 *           type: string
 *           example: Admin
 *         modules:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Dashboard
 *               - Team
 *               - Customers
 *               - Stores
 *               - Country
 *               - Delivery partners
 *               - Pickup partners
 *               - Pricing
 *               - Product
 *               - Fabric
 *               - Pickup assign
 *               - Pre-booking
 *               - Booking
 *               - Package ready
 *               - Repacking
 *               - Containers
 *               - Ready to stuff
 *               - Stuffing
 *               - Invoicing
 *               - Credit note
 *               - Daily expense
 *               - Receipt Entry
 *               - Reports
 *           example:
 *             - Dashboard
 *             - Team
 *             - Reports
 *         isDeleted:
 *           type: boolean
 *           example: false
 *
 *     RoleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Role retrieved successfully
 *         data:
 *           $ref: '#/components/schemas/Role'
 *
 *     PaginatedRolesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Roles retrieved successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
 *         pagination:
 *           type: object
 *           properties:
 *             currentPage:
 *               type: integer
 *               example: 1
 *             limit:
 *               type: integer
 *               example: 10
 *             totalRecords:
 *               type: integer
 *               example: 25
 *             totalPages:
 *               type: integer
 *               example: 3
 *             hasPreviousPage:
 *               type: boolean
 *               example: false
 *             hasNextPage:
 *               type: boolean
 *               example: true
 *
 *     CreateRole:
 *       type: object
 *       required:
 *         - roleName
 *       properties:
 *         roleName:
 *           type: string
 *           example: Admin
 *         modules:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Dashboard
 *               - Team
 *               - Customers
 *               - Stores
 *               - Country
 *               - Delivery partners
 *               - Pickup partners
 *               - Pricing
 *               - Product
 *               - Fabric
 *               - Pickup assign
 *               - Pre-booking
 *               - Booking
 *               - Package ready
 *               - Repacking
 *               - Containers
 *               - Ready to stuff
 *               - Stuffing
 *               - Invoicing
 *               - Credit note
 *               - Daily expense
 *               - Receipt Entry
 *               - Reports
 *           example:
 *             - Dashboard
 *             - Team
 *             - Reports
 *
 *     UpdateRole:
 *       type: object
 *       properties:
 *         roleName:
 *           type: string
 *           example: Supervisor
 *         modules:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - Dashboard
 *               - Team
 *               - Customers
 *               - Stores
 *               - Country
 *               - Delivery partners
 *               - Pickup partners
 *               - Pricing
 *               - Product
 *               - Fabric
 *               - Pickup assign
 *               - Pre-booking
 *               - Booking
 *               - Package ready
 *               - Repacking
 *               - Containers
 *               - Ready to stuff
 *               - Stuffing
 *               - Invoicing
 *               - Credit note
 *               - Daily expense
 *               - Receipt Entry
 *               - Reports
 *           example:
 *             - Dashboard
 *             - Team
 *             - Reports
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRole'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       400:
 *         description: Invalid request or role already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, roleController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles with pagination
 *     tags: [Roles]
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
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedRolesResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, roleController.getAllRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", verifyToken, roleController.getRoleById);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRole'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       400:
 *         description: Invalid request or role already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", verifyToken, roleController.editRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 665c2f8a9b12345678901234
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, roleController.deleteRole);

export default router;
