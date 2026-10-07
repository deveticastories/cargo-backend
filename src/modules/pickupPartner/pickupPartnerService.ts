import logger from "../../utils/logger";
import * as pickupPartnerRepository from "./pickupPartnerRepository";
import { PickupPartnerDocument } from "../../models/pickupPartnerModel";

export const createPickupPartner = async (
  pickupPartnerData: Partial<PickupPartnerDocument>,
): Promise<PickupPartnerDocument> => {
  try {
    logger.info("Creating a new pickup partner", {
      pickupPartnerData,
    });

    if (pickupPartnerData.whatsapp) {
      const existingPickupPartner =
        await pickupPartnerRepository.findByWhatsapp(
          pickupPartnerData.whatsapp,
        );

      if (existingPickupPartner) {
        throw new Error(
          `Pickup partner with WhatsApp '${pickupPartnerData.whatsapp}' already exists.`,
        );
      }
    }

    const newPickupPartner =
      await pickupPartnerRepository.create(pickupPartnerData);

    logger.info("Pickup partner created successfully", {
      pickupPartnerId: newPickupPartner._id,
      name: newPickupPartner.name,
    });

    return newPickupPartner;
  } catch (error: any) {
    logger.error("Error creating pickup partner", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editPickupPartner = async (
  pickupPartnerId: string,
  pickupPartnerData: Partial<PickupPartnerDocument>,
): Promise<PickupPartnerDocument | null> => {
  try {
    logger.info(
      `Editing pickup partner with ID ${pickupPartnerId}`,
      {
        pickupPartnerData,
      },
    );

    if (pickupPartnerData.whatsapp) {
      const existingPickupPartner =
        await pickupPartnerRepository.findByWhatsapp(
          pickupPartnerData.whatsapp,
        );

      if (
        existingPickupPartner &&
        existingPickupPartner._id.toString() !== pickupPartnerId
      ) {
        throw new Error(
          `Pickup partner with WhatsApp '${pickupPartnerData.whatsapp}' already exists.`,
        );
      }
    }

    const updatedPickupPartner =
      await pickupPartnerRepository.updateById(
        pickupPartnerId,
        pickupPartnerData,
      );

    if (!updatedPickupPartner) {
      throw new Error(
        `Pickup partner with ID ${pickupPartnerId} not found`,
      );
    }

    logger.info("Pickup partner updated successfully", {
      pickupPartnerId: updatedPickupPartner._id,
    });

    return updatedPickupPartner;
  } catch (error: any) {
    logger.error("Error updating pickup partner", {
      pickupPartnerId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllPickupPartners = async (): Promise<
  PickupPartnerDocument[]
> => {
  logger.info("Getting all pickup partners");

  return pickupPartnerRepository.getAllPickupPartners();
};

export const getPickupPartnerById = async (
  id: string,
): Promise<PickupPartnerDocument | null> => {
  logger.info(`Getting pickup partner with ID ${id}`);

  return pickupPartnerRepository.findById(id);
};

export const deletePickupPartner = async (
  pickupPartnerId: string,
): Promise<PickupPartnerDocument | null> => {
  try {
    logger.info(
      `Deleting pickup partner with ID ${pickupPartnerId}`,
    );

    const deletedPickupPartner =
      await pickupPartnerRepository.deletePickupPartner(
        pickupPartnerId,
      );

    if (!deletedPickupPartner) {
      throw new Error(
        `Pickup partner with ID ${pickupPartnerId} not found`,
      );
    }

    logger.info("Pickup partner deleted successfully", {
      pickupPartnerId,
    });

    return deletedPickupPartner;
  } catch (error: any) {
    logger.error("Error deleting pickup partner", {
      pickupPartnerId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updatePickupPartnerStatus = async (
  id: string,
  updatedData: Partial<PickupPartnerDocument>,
): Promise<PickupPartnerDocument | null> => {
  try {
    logger.info(
      `Updating status for pickup partner with ID ${id} to ${updatedData.status}`,
    );

    const updatedPickupPartner =
      await pickupPartnerRepository.changePickupPartnerStatus(
        id,
        updatedData,
      );

    if (!updatedPickupPartner) {
      throw new Error(
        `Pickup partner with ID ${id} not found`,
      );
    }

    logger.info("Pickup partner status updated successfully", {
      pickupPartnerId: id,
      status: updatedData.status,
    });

    return updatedPickupPartner;
  } catch (error: any) {
    logger.error("Error updating pickup partner status", {
      pickupPartnerId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};