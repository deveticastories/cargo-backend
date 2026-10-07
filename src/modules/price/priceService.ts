import logger from "../../utils/logger";
import * as pricingRepository from "./priceRepository";
import { PricingDocument } from "../../models/priceModel";

export const createPricing = async (
  pricingData: Partial<PricingDocument>,
): Promise<PricingDocument> => {
  try {
    logger.info("Creating a new pricing", {
      pricingData,
    });

    if (
      pricingData.from &&
      pricingData.to &&
      pricingData.uom
    ) {
      const existingPricing =
        await pricingRepository.findByRoute(
          pricingData.from,
          pricingData.to,
          pricingData.uom,
        );

      if (existingPricing) {
        throw new Error(
          `Pricing from '${pricingData.from}' to '${pricingData.to}' for UOM '${pricingData.uom}' already exists.`,
        );
      }
    }

    const newPricing =
      await pricingRepository.create(pricingData);

    logger.info("Pricing created successfully", {
      pricingId: newPricing._id,
      from: newPricing.from,
      to: newPricing.to,
      uom: newPricing.uom,
    });

    return newPricing;
  } catch (error: any) {
    logger.error("Error creating pricing", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editPricing = async (
  pricingId: string,
  pricingData: Partial<PricingDocument>,
): Promise<PricingDocument | null> => {
  try {
    logger.info(
      `Editing pricing with ID ${pricingId}`,
      { pricingData },
    );

    const currentPricing =
      await pricingRepository.findById(pricingId);

    if (!currentPricing) {
      throw new Error(
        `Pricing with ID ${pricingId} not found`,
      );
    }

    const from = pricingData.from ?? currentPricing.from;
    const to = pricingData.to ?? currentPricing.to;
    const uom = pricingData.uom ?? currentPricing.uom;

    const existingPricing =
      await pricingRepository.findByRoute(
        from,
        to,
        uom,
      );

    if (
      existingPricing &&
      existingPricing._id.toString() !== pricingId
    ) {
      throw new Error(
        `Pricing from '${from}' to '${to}' for UOM '${uom}' already exists.`,
      );
    }

    const updatedPricing =
      await pricingRepository.updateById(
        pricingId,
        pricingData,
      );

    if (!updatedPricing) {
      throw new Error(
        `Pricing with ID ${pricingId} not found`,
      );
    }

    logger.info("Pricing updated successfully", {
      pricingId: updatedPricing._id,
    });

    return updatedPricing;
  } catch (error: any) {
    logger.error("Error updating pricing", {
      pricingId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllPricings = async (): Promise<
  PricingDocument[]
> => {
  logger.info("Getting all pricings");

  return pricingRepository.getAllPricings();
};

export const getPricingById = async (
  id: string,
): Promise<PricingDocument | null> => {
  logger.info(`Getting pricing with ID ${id}`);

  return pricingRepository.findById(id);
};

export const deletePricing = async (
  pricingId: string,
): Promise<PricingDocument | null> => {
  try {
    logger.info(
      `Deleting pricing with ID ${pricingId}`,
    );

    const deletedPricing =
      await pricingRepository.deletePricing(pricingId);

    if (!deletedPricing) {
      throw new Error(
        `Pricing with ID ${pricingId} not found`,
      );
    }

    logger.info("Pricing deleted successfully", {
      pricingId,
    });

    return deletedPricing;
  } catch (error: any) {
    logger.error("Error deleting pricing", {
      pricingId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};