import logger from "../../utils/logger";
import * as unitRepository from "./unitRepository";
import { UnitDocument } from "../../models/unitModel";

export const createUnit = async (
  unitData: Partial<UnitDocument>,
): Promise<UnitDocument> => {
  try {
    logger.info("Creating a new unit", {
      unitData,
    });

    if (unitData.name) {
      const existingUnit =
        await unitRepository.findByName(unitData.name);

      if (existingUnit) {
        throw new Error(
          `Unit with name '${unitData.name}' already exists.`,
        );
      }
    }

    const newUnit =
      await unitRepository.create(unitData);

    logger.info("Unit created successfully", {
      unitId: newUnit._id,
      name: newUnit.name,
    });

    return newUnit;
  } catch (error: any) {
    logger.error("Error creating unit", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editUnit = async (
  unitId: string,
  unitData: Partial<UnitDocument>,
): Promise<UnitDocument | null> => {
  try {
    logger.info(
      `Editing unit with ID ${unitId}`,
      { unitData },
    );

    if (unitData.name) {
      const existingUnit =
        await unitRepository.findByName(unitData.name);

      if (
        existingUnit &&
        existingUnit._id.toString() !== unitId
      ) {
        throw new Error(
          `Unit with name '${unitData.name}' already exists.`,
        );
      }
    }

    const updatedUnit =
      await unitRepository.updateById(
        unitId,
        unitData,
      );

    if (!updatedUnit) {
      throw new Error(
        `Unit with ID ${unitId} not found`,
      );
    }

    logger.info("Unit updated successfully", {
      unitId: updatedUnit._id,
    });

    return updatedUnit;
  } catch (error: any) {
    logger.error("Error updating unit", {
      unitId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllUnits = async (): Promise<
  UnitDocument[]
> => {
  logger.info("Getting all units");

  return unitRepository.getAllUnits();
};

export const getUnitById = async (
  id: string,
): Promise<UnitDocument | null> => {
  logger.info(`Getting unit with ID ${id}`);

  return unitRepository.findById(id);
};

export const deleteUnit = async (
  unitId: string,
): Promise<UnitDocument | null> => {
  try {
    logger.info(
      `Deleting unit with ID ${unitId}`,
    );

    const deletedUnit =
      await unitRepository.deleteUnit(unitId);

    if (!deletedUnit) {
      throw new Error(
        `Unit with ID ${unitId} not found`,
      );
    }

    logger.info("Unit deleted successfully", {
      unitId,
    });

    return deletedUnit;
  } catch (error: any) {
    logger.error("Error deleting unit", {
      unitId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateUnitStatus = async (
  id: string,
  updatedData: Partial<UnitDocument>,
): Promise<UnitDocument | null> => {
  try {
    logger.info(
      `Updating status for unit with ID ${id} to ${updatedData.status}`,
    );

    const updatedUnit =
      await unitRepository.changeUnitStatus(
        id,
        updatedData,
      );

    if (!updatedUnit) {
      throw new Error(
        `Unit with ID ${id} not found`,
      );
    }

    logger.info("Unit status updated successfully", {
      unitId: id,
      status: updatedData.status,
    });

    return updatedUnit;
  } catch (error: any) {
    logger.error("Error updating unit status", {
      unitId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};