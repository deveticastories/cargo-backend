import { Response } from "express";

import * as pickupAssignService from "./pickupAssignService";

import { message } from "../../constants/responseMessage";

import { RequestWithAuthData } from "../../@types/express";
import mongoose from "mongoose";

export const createPickupAssign = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        const pickupAssignData = {
            ...req.body,
            createdBy: req.userId,
        };

        const createdPickupAssign =
            await pickupAssignService.createPickupAssign(
                pickupAssignData,
            );

        return res.status(201).json({
            success: true,
            message: message.PICKUP_ASSIGN_CREATED,
            pickupAssign: createdPickupAssign,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const editPickupAssign = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PICKUP_ASSIGN_ID,
        });
    }

    try {
        const existingPickupAssign =
            await pickupAssignService.getPickupAssignById(id);

        if (!existingPickupAssign) {
            return res.status(404).json({
                success: false,
                message: message.PICKUP_ASSIGN_NOT_FOUND,
            });
        }

        const pickupAssignData = {
            ...req.body,
            updatedBy: req.userId,
            updatedAt: new Date(),
        };

        const updatedPickupAssign =
            await pickupAssignService.editPickupAssign(
                id,
                pickupAssignData,
            );

        return res.status(200).json({
            success: true,
            message: message.PICKUP_ASSIGN_UPDATED,
            pickupAssign: updatedPickupAssign,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deletePickupAssign = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: message.INVALID_PICKUP_ASSIGN_ID,
            });
        }

        const deletedPickupAssign =
            await pickupAssignService.deletePickupAssign(id);

        if (!deletedPickupAssign) {
            return res.status(404).json({
                success: false,
                message: message.PICKUP_ASSIGN_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: message.PICKUP_ASSIGN_DELETED,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getPickupAssignById = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: message.INVALID_PICKUP_ASSIGN_ID,
            });
        }

        const pickupAssign =
            await pickupAssignService.getPickupAssignById(id);

        if (!pickupAssign) {
            return res.status(404).json({
                success: false,
                message: message.PICKUP_ASSIGN_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            pickupAssign,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllPickupAssigns = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        const pickupAssigns =
            await pickupAssignService.getAllPickupAssigns();

        return res.status(200).json({
            success: true,
            pickupAssigns,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updatePickupAssignStatus = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PICKUP_ASSIGN_ID,
        });
    }

    try {
        const updatedPickupAssign =
            await pickupAssignService.updatePickupAssignStatus(
                id,
                req.body.status,
                req.userId.toString(),
            );

        if (!updatedPickupAssign) {
            return res.status(404).json({
                success: false,
                message: message.PICKUP_ASSIGN_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: message.PICKUP_ASSIGN_STATUS_UPDATED,
            pickupAssign: updatedPickupAssign,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const updatePaymentStatus = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    console.log("\n========== UPDATE PAYMENT STATUS CONTROLLER ==========");

    console.log("User ID:", req.userId);
    console.log("Role:", req.role);

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    if (
        typeof id !== "string" ||
        !mongoose.Types.ObjectId.isValid(id)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid pickup assignment ID",
        });
    }

    if (!["Unpaid", "Paid"].includes(paymentStatus)) {
        return res.status(400).json({
            success: false,
            message: "Invalid payment status",
        });
    }

    const userRole =
        typeof req.role === "string"
            ? req.role
            : (req.role as any)?.roleName;

    if (!userRole) {
        return res.status(403).json({
            success: false,
            message: "User role not found",
        });
    }

    console.log("Passing role to service:", userRole);

    try {
        const result = await pickupAssignService.updatePaymentStatus(
            id,
            paymentStatus as "Unpaid" | "Paid",
            req.userId.toString(),
            userRole,
        );

        return res.status(200).json({
            success: true,
            message: "Pickup assignment payment status updated successfully",
            pickupAssign: result,
        });
    } catch (error: any) {
        console.error("CONTROLLER ERROR:", error);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const markCollected = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PICKUP_ASSIGN_ID,
        });
    }

    try {
        const updatedPickupAssign =
            await pickupAssignService.markCollected(
                id,
                req.body.collectedBundle,
                req.userId.toString(),
            );

        if (!updatedPickupAssign) {
            return res.status(404).json({
                success: false,
                message: message.PICKUP_ASSIGN_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: message.PICKUP_ASSIGN_COLLECTED,
            pickupAssign: updatedPickupAssign,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};