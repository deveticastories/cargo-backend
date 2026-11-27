
import logger from "../../utils/logger";
import * as deliveryAssignRepository from "./deliveryAssignRepository";
import { DeliveryAssignDocument } from "../../models/deliveryAssignModel";

export const createDeliveryAssign = async (
  deliveryAssignData: Partial<DeliveryAssignDocument>,
): Promise<DeliveryAssignDocument> => {
  try {
    logger.info("Creating a new delivery assignment", {
      deliveryAssignData,
    });

    const newDeliveryAssign =
      await deliveryAssignRepository.create(deliveryAssignData);

    logger.info("Delivery assignment created successfully", {
      deliveryAssignId: newDeliveryAssign._id,
      lrNumber: newDeliveryAssign.lrNumber,
    });

    return newDeliveryAssign;
  } catch (error: any) {
    logger.error("Error creating delivery assignment", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editDeliveryAssign = async (
  deliveryAssignId: string,
  deliveryAssignData: Partial<DeliveryAssignDocument>,
): Promise<DeliveryAssignDocument | null> => {
  try {
    logger.info(
      `Editing delivery assignment with ID ${deliveryAssignId}`,
      {
        deliveryAssignData,
      },
    );

    const updatedDeliveryAssign =
      await deliveryAssignRepository.updateById(
        deliveryAssignId,
        deliveryAssignData,
      );

    if (!updatedDeliveryAssign) {
      throw new Error(
        `Delivery assignment with ID ${deliveryAssignId} not found`,
      );
    }

    logger.info("Delivery assignment updated successfully", {
      deliveryAssignId: updatedDeliveryAssign._id,
    });

    return updatedDeliveryAssign;
  } catch (error: any) {
    logger.error("Error updating delivery assignment", {
      deliveryAssignId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllDeliveryAssigns = async (): Promise<
  DeliveryAssignDocument[]
> => {
  logger.info("Getting all delivery assignments");

  return deliveryAssignRepository.getAllDeliveryAssigns();
};

export const getDeliveryAssignById = async (
  id: string,
): Promise<DeliveryAssignDocument | null> => {
  logger.info(`Getting delivery assignment with ID ${id}`);

  return deliveryAssignRepository.findById(id);
};

export const deleteDeliveryAssign = async (
  deliveryAssignId: string,
): Promise<DeliveryAssignDocument | null> => {
  try {
    logger.info(
      `Deleting delivery assignment with ID ${deliveryAssignId}`,
    );

    const deletedDeliveryAssign =
      await deliveryAssignRepository.deleteDeliveryAssign(
        deliveryAssignId,
      );

    if (!deletedDeliveryAssign) {
      throw new Error(
        `Delivery assignment with ID ${deliveryAssignId} not found`,
      );
    }

    logger.info("Delivery assignment deleted successfully", {
      deliveryAssignId,
    });

    return deletedDeliveryAssign;
  } catch (error: any) {
    logger.error("Error deleting delivery assignment", {
      deliveryAssignId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateDeliveryAssignStatus = async (
  id: string,
  updatedData: Partial<DeliveryAssignDocument>,
): Promise<DeliveryAssignDocument | null> => {
  try {
    logger.info(
      `Updating status for delivery assignment with ID ${id} to ${updatedData.status}`,
    );

    const updatedDeliveryAssign =
      await deliveryAssignRepository.changeDeliveryAssignStatus(
        id,
        updatedData,
      );

    if (!updatedDeliveryAssign) {
      throw new Error(
        `Delivery assignment with ID ${id} not found`,
      );
    }

    logger.info("Delivery assignment status updated successfully", {
      deliveryAssignId: id,
      status: updatedData.status,
    });

    return updatedDeliveryAssign;
  } catch (error: any) {
    logger.error("Error updating delivery assignment status", {
      deliveryAssignId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};
