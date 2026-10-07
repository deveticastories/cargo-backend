import logger from "../../utils/logger.js";

import * as pickupAssignRepository from "./pickupAssignRepository.js";

import { PickupAssignDocument } from "../../models/pickupAssignModel.js";

export const createPickupAssign = async (
  pickupAssignData: Partial<PickupAssignDocument>,
): Promise<PickupAssignDocument> => {
  try {
    logger.info("Creating a new pickup assign", {
      pickupAssignData,
    });

    // Check duplicate LR number
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

    const newPickupAssign =
      await pickupAssignRepository.create(
        pickupAssignData,
      );

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

    // Check duplicate LR number when changing LR number
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

    const updatedPickupAssign =
      await pickupAssignRepository.updateById(
        pickupAssignId,
        pickupAssignData,
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
  updatedBy?: string,
): Promise<PickupAssignDocument | null> => {
  try {
    logger.info(
      `Updating payment status for pickup assign ${id}`,
      {
        paymentStatus,
      },
    );

    const updatedPickupAssign =
      await pickupAssignRepository.changePaymentStatus(
        id,
        paymentStatus,
        updatedBy,
      );

    if (!updatedPickupAssign) {
      throw new Error(
        `Pickup assign with ID ${id} not found`,
      );
    }

    logger.info(
      "Pickup assign payment status updated successfully",
      {
        pickupAssignId: id,
        paymentStatus,
      },
    );

    return updatedPickupAssign;
  } catch (error: any) {
    logger.error(
      "Error updating pickup assign payment status",
      {
        pickupAssignId: id,
        error: error.message,
      },
    );

    throw new Error(error.message);
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