import logger from "../../utils/logger";
import * as fabricRepository from "./fabricRepository";
import { FabricDocument } from "../../models/fabricModel";

export const createFabric = async (
  fabricData: Partial<FabricDocument>,
): Promise<FabricDocument> => {
  try {
    logger.info("Creating a new fabric", {
      fabricData,
    });

    if (fabricData.name) {
      const existingFabric =
        await fabricRepository.findByName(fabricData.name);

      if (existingFabric) {
        throw new Error(
          `Fabric with name '${fabricData.name}' already exists.`,
        );
      }
    }

    const newFabric =
      await fabricRepository.create(fabricData);

    logger.info("Fabric created successfully", {
      fabricId: newFabric._id,
      name: newFabric.name,
    });

    return newFabric;
  } catch (error: any) {
    logger.error("Error creating fabric", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editFabric = async (
  fabricId: string,
  fabricData: Partial<FabricDocument>,
): Promise<FabricDocument | null> => {
  try {
    logger.info(
      `Editing fabric with ID ${fabricId}`,
      { fabricData },
    );

    if (fabricData.name) {
      const existingFabric =
        await fabricRepository.findByName(fabricData.name);

      if (
        existingFabric &&
        existingFabric._id.toString() !== fabricId
      ) {
        throw new Error(
          `Fabric with name '${fabricData.name}' already exists.`,
        );
      }
    }

    const updatedFabric =
      await fabricRepository.updateById(
        fabricId,
        fabricData,
      );

    if (!updatedFabric) {
      throw new Error(
        `Fabric with ID ${fabricId} not found`,
      );
    }

    logger.info("Fabric updated successfully", {
      fabricId: updatedFabric._id,
    });

    return updatedFabric;
  } catch (error: any) {
    logger.error("Error updating fabric", {
      fabricId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllFabrics = async (): Promise<
  FabricDocument[]
> => {
  logger.info("Getting all fabrics");

  return fabricRepository.getAllFabrics();
};

export const getFabricById = async (
  id: string,
): Promise<FabricDocument | null> => {
  logger.info(`Getting fabric with ID ${id}`);

  return fabricRepository.findById(id);
};

export const deleteFabric = async (
  fabricId: string,
): Promise<FabricDocument | null> => {
  try {
    logger.info(
      `Deleting fabric with ID ${fabricId}`,
    );

    const deletedFabric =
      await fabricRepository.deleteFabric(fabricId);

    if (!deletedFabric) {
      throw new Error(
        `Fabric with ID ${fabricId} not found`,
      );
    }

    logger.info("Fabric deleted successfully", {
      fabricId,
    });

    return deletedFabric;
  } catch (error: any) {
    logger.error("Error deleting fabric", {
      fabricId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateFabricStatus = async (
  id: string,
  updatedData: Partial<FabricDocument>,
): Promise<FabricDocument | null> => {
  try {
    logger.info(
      `Updating status for fabric with ID ${id} to ${updatedData.status}`,
    );

    const updatedFabric =
      await fabricRepository.changeFabricStatus(
        id,
        updatedData,
      );

    if (!updatedFabric) {
      throw new Error(
        `Fabric with ID ${id} not found`,
      );
    }

    logger.info("Fabric status updated successfully", {
      fabricId: id,
      status: updatedData.status,
    });

    return updatedFabric;
  } catch (error: any) {
    logger.error("Error updating fabric status", {
      fabricId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};