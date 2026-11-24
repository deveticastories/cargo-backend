import logger from "../../utils/logger.js";

import * as pickupAssignRepository from "./pickupAssignRepository";
import * as walletService from "../wallet/walletService";

import {
    PickupAssignDocument,
} from "../../models/pickupAssignModel";
import mongoose from "mongoose";
const getPickupStatus = (
    bundleCount: number,
    collectedBundle: number,
): "Pending" | "Partially Collected" | "Collected" => {
    if (collectedBundle === 0) {
        return "Pending";
    }

    if (collectedBundle === bundleCount) {
        return "Collected";
    }

    return "Partially Collected";
};


export const createPickupAssign = async (
    pickupAssignData: Partial<PickupAssignDocument>,
): Promise<PickupAssignDocument> => {
    try {
        logger.info("Creating a new pickup assign", {
            pickupAssignData,
        });

        if (pickupAssignData.lrNo) {
            const existingPickupAssign =
                await pickupAssignRepository.findByLrNo(
                    pickupAssignData.lrNo,
                );

            if (existingPickupAssign) {
                throw new Error(
                    `Pickup assign with LR number '${pickupAssignData.lrNo}' already exists.`,
                );
            }
        }

        const bundleCount = pickupAssignData.bundleCount ?? 0;
        const collectedBundle = pickupAssignData.collectedBundle ?? 0;

        pickupAssignData.pickupStatus = getPickupStatus(
            bundleCount,
            collectedBundle,
        );

        const newPickupAssign =
            await pickupAssignRepository.create({
                ...pickupAssignData,
                sender: pickupAssignData.sender ?? undefined,
                receiver: pickupAssignData.receiver ?? undefined,
            });

        logger.info("Pickup assign created successfully", {
            pickupAssignId: newPickupAssign._id,
            lrNo: newPickupAssign.lrNo,
        });

        return newPickupAssign;
    } catch (error: any) {
        logger.error("Error creating pickup assign", {
            error: error.message,
        });

        throw new Error(error.message);
    }
};



export const editPickupAssign = async (
    pickupAssignId: string,
    pickupAssignData: Partial<PickupAssignDocument>,
): Promise<PickupAssignDocument | null> => {
    try {
        logger.info(
            `Editing pickup assign with ID ${pickupAssignId}`,
            {
                pickupAssignData,
            },
        );

        if (pickupAssignData.lrNo) {
            const existingPickupAssign =
                await pickupAssignRepository.findByLrNo(
                    pickupAssignData.lrNo,
                );

            if (
                existingPickupAssign &&
                existingPickupAssign._id.toString() !== pickupAssignId
            ) {
                throw new Error(
                    `Pickup assign with LR number '${pickupAssignData.lrNo}' already exists.`,
                );
            }
        }

        const existingPickupAssign =
            await pickupAssignRepository.findById(pickupAssignId);

        if (!existingPickupAssign) {
            throw new Error(
                `Pickup assign with ID ${pickupAssignId} not found`,
            );
        }

        const bundleCount =
            pickupAssignData.bundleCount ??
            existingPickupAssign.bundleCount;

        const collectedBundle =
            pickupAssignData.collectedBundle ??
            existingPickupAssign.collectedBundle;

        pickupAssignData.pickupStatus = getPickupStatus(
            bundleCount,
            collectedBundle,
        );

        const updatedPickupAssign =
            await pickupAssignRepository.updateById(
                pickupAssignId,
                {
                    ...pickupAssignData,
                    sender: pickupAssignData.sender !== undefined
                        ? pickupAssignData.sender
                        : existingPickupAssign.sender,

                    receiver: pickupAssignData.receiver !== undefined
                        ? pickupAssignData.receiver
                        : existingPickupAssign.receiver,
                },
            );

        if (!updatedPickupAssign) {
            throw new Error(
                `Pickup assign with ID ${pickupAssignId} not found`,
            );
        }

        logger.info("Pickup assign updated successfully", {
            pickupAssignId: updatedPickupAssign._id,
        });

        return updatedPickupAssign;
    } catch (error: any) {
        logger.error("Error updating pickup assign", {
            pickupAssignId,
            error: error.message,
        });

        throw new Error(error.message);
    }
};


export const getAllPickupAssigns = async (): Promise<
    PickupAssignDocument[]
> => {
    try {
        logger.info("Getting all pickup assigns");

        return await pickupAssignRepository.getAllPickupAssigns();
    } catch (error: any) {
        logger.error("Error getting all pickup assigns", {
            error: error.message,
        });

        throw new Error(error.message);
    }
};

export const getPickupAssignById = async (
    id: string,
): Promise<PickupAssignDocument | null> => {
    try {
        logger.info(`Getting pickup assign with ID ${id}`);

        return await pickupAssignRepository.findById(id);
    } catch (error: any) {
        logger.error("Error getting pickup assign", {
            pickupAssignId: id,
            error: error.message,
        });

        throw new Error(error.message);
    }
};

export const deletePickupAssign = async (
    pickupAssignId: string,
): Promise<PickupAssignDocument | null> => {
    try {
        logger.info(
            `Deleting pickup assign with ID ${pickupAssignId}`,
        );

        const deletedPickupAssign =
            await pickupAssignRepository.deletePickupAssign(
                pickupAssignId,
            );

        if (!deletedPickupAssign) {
            throw new Error(
                `Pickup assign with ID ${pickupAssignId} not found`,
            );
        }

        logger.info("Pickup assign deleted successfully", {
            pickupAssignId,
        });

        return deletedPickupAssign;
    } catch (error: any) {
        logger.error("Error deleting pickup assign", {
            pickupAssignId,
            error: error.message,
        });

        throw new Error(error.message);
    }
};

export const updatePickupAssignStatus = async (
    id: string,
    status: boolean,
    updatedBy?: string,
): Promise<PickupAssignDocument | null> => {
    try {
        logger.info(
            `Updating status for pickup assign with ID ${id}`,
            {
                status,
            },
        );

        const updatedPickupAssign =
            await pickupAssignRepository.changePickupAssignStatus(
                id,
                status,
                updatedBy,
            );

        if (!updatedPickupAssign) {
            throw new Error(
                `Pickup assign with ID ${id} not found`,
            );
        }

        logger.info("Pickup assign status updated successfully", {
            pickupAssignId: id,
            status,
        });

        return updatedPickupAssign;
    } catch (error: any) {
        logger.error("Error updating pickup assign status", {
            pickupAssignId: id,
            error: error.message,
        });

        throw new Error(error.message);
    }
};
export const updatePaymentStatus = async (
    id: string,
    paymentStatus: "Unpaid" | "Paid",
    updatedBy: string,
    userRole: string,
): Promise<PickupAssignDocument | null> => {
    console.log("\n========== UPDATE PAYMENT STATUS SERVICE ==========");

    try {
        console.log("Pickup assignment ID:", id);
        console.log("Payment status:", paymentStatus);
        console.log("Updated by:", updatedBy);
        console.log("User role:", userRole);

        // Step 1: Find pickup assignment
        console.log("\nSTEP 1: Finding pickup assignment...");

        const pickupAssign =
            await pickupAssignRepository.findById(id);

        console.log("Pickup assignment:", pickupAssign);

        if (!pickupAssign) {
            throw new Error("Pickup assignment not found");
        }

        console.log("Current payment status:", pickupAssign.paymentStatus);
        console.log("Booking amount:", pickupAssign.amount);

        // Step 2: Check existing payment status
        console.log("\nSTEP 2: Checking existing payment status...");

        if (pickupAssign.paymentStatus === "Paid") {
            if (paymentStatus === "Unpaid") {
                throw new Error(
                    "Paid assignments cannot be changed to Unpaid",
                );
            }

            console.log("Assignment is already Paid");
            return pickupAssign;
        }

        // Step 3: Deduct wallet only for Pickup role
        if (paymentStatus === "Paid" && userRole === "Pickup") {
            console.log("\nSTEP 3: WALLET DEDUCTION STARTED");

            console.log("Wallet user ID:", updatedBy);
            console.log("Deduction amount:", pickupAssign.amount);
            console.log("Booking reference:", id);

            const walletResult =
                await walletService.deductWalletMoney(
                    updatedBy,
                    pickupAssign.amount,
                    id,
                );

            console.log("Wallet deduction result:", walletResult);
            console.log("Wallet deduction completed successfully");
        } else {
            console.log("\nSTEP 3: WALLET DEDUCTION SKIPPED");
            console.log("Payment status:", paymentStatus);
            console.log("User role:", userRole);
        }

        // Step 4: Update pickup assignment payment status
        console.log("\nSTEP 4: Updating pickup assignment...");

        const updatedPickupAssign =
            await pickupAssignRepository.changePaymentStatus(
                id,
                paymentStatus,
                updatedBy,
            );

        console.log("Updated pickup assignment:", updatedPickupAssign);

        if (!updatedPickupAssign) {
            throw new Error(
                "Pickup assignment payment status update failed",
            );
        }

        console.log("PAYMENT STATUS UPDATED SUCCESSFULLY");
        console.log("====================================================\n");

        return updatedPickupAssign;
    } catch (error: any) {
        console.error("\n========== UPDATE PAYMENT STATUS ERROR ==========");
        console.error("Error message:", error.message);
        console.error("Full error:", error);
        console.error("==================================================\n");

        throw error;
    }
};
export const markCollected = async (
    id: string,
    collectedBundle: number,
    updatedBy?: string,
): Promise<PickupAssignDocument | null> => {
    try {
        logger.info(
            `Marking pickup assign ${id} as collected`,
            {
                collectedBundle,
            },
        );

        const pickupAssign =
            await pickupAssignRepository.findById(id);

        if (!pickupAssign) {
            throw new Error(
                `Pickup assign with ID ${id} not found`,
            );
        }

        if (collectedBundle < 0) {
            throw new Error(
                "Collected bundle cannot be less than 0.",
            );
        }

        if (collectedBundle > pickupAssign.bundleCount) {
            throw new Error(
                "Collected bundle cannot be greater than bundle count.",
            );
        }

        const updatedPickupAssign =
            await pickupAssignRepository.markCollected(
                id,
                collectedBundle,
                updatedBy,
            );

        if (!updatedPickupAssign) {
            throw new Error(
                `Pickup assign with ID ${id} not found`,
            );
        }

        logger.info("Pickup assign marked as collected", {
            pickupAssignId: id,
            collectedBundle,
        });

        return updatedPickupAssign;
    } catch (error: any) {
        logger.error("Error marking pickup assign as collected", {
            pickupAssignId: id,
            error: error.message,
        });

        throw new Error(error.message);
    }
};