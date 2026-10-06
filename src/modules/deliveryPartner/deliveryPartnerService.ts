import logger from "../../utils/logger";
import * as deliveryPartnerRepository from "./deliveryPartnerRepository";
import { DeliveryPartnerDocument } from "../../models/deliveryPartnerModel";

export const createDeliveryPartner = async (
  deliveryPartnerData: Partial<DeliveryPartnerDocument>,
): Promise<DeliveryPartnerDocument> => {
  try {
    logger.info("Creating a new delivery partner", {
      deliveryPartnerData,
    });

    if (deliveryPartnerData.whatsapp) {
      const existingDeliveryPartner =
        await deliveryPartnerRepository.findByWhatsapp(
          deliveryPartnerData.whatsapp,
        );

      if (existingDeliveryPartner) {
        throw new Error(
          `Delivery partner with WhatsApp '${deliveryPartnerData.whatsapp}' already exists.`,
        );
      }
    }

    const newDeliveryPartner =
      await deliveryPartnerRepository.create(deliveryPartnerData);

    logger.info("Delivery partner created successfully", {
      deliveryPartnerId: newDeliveryPartner._id,
      name: newDeliveryPartner.name,
    });

    return newDeliveryPartner;
  } catch (error: any) {
    logger.error("Error creating delivery partner", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editDeliveryPartner = async (
  deliveryPartnerId: string,
  deliveryPartnerData: Partial<DeliveryPartnerDocument>,
): Promise<DeliveryPartnerDocument | null> => {
  try {
    logger.info(
      `Editing delivery partner with ID ${deliveryPartnerId}`,
      {
        deliveryPartnerData,
      },
    );

    if (deliveryPartnerData.whatsapp) {
      const existingDeliveryPartner =
        await deliveryPartnerRepository.findByWhatsapp(
          deliveryPartnerData.whatsapp,
        );

      if (
        existingDeliveryPartner &&
        existingDeliveryPartner._id.toString() !== deliveryPartnerId
      ) {
        throw new Error(
          `Delivery partner with WhatsApp '${deliveryPartnerData.whatsapp}' already exists.`,
        );
      }
    }

    const updatedDeliveryPartner =
      await deliveryPartnerRepository.updateById(
        deliveryPartnerId,
        deliveryPartnerData,
      );

    if (!updatedDeliveryPartner) {
      throw new Error(
        `Delivery partner with ID ${deliveryPartnerId} not found`,
      );
    }

    logger.info("Delivery partner updated successfully", {
      deliveryPartnerId: updatedDeliveryPartner._id,
    });

    return updatedDeliveryPartner;
  } catch (error: any) {
    logger.error("Error updating delivery partner", {
      deliveryPartnerId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllDeliveryPartners = async (): Promise<
  DeliveryPartnerDocument[]
> => {
  logger.info("Getting all delivery partners");

  return deliveryPartnerRepository.getAllDeliveryPartners();
};

export const getDeliveryPartnerById = async (
  id: string,
): Promise<DeliveryPartnerDocument | null> => {
  logger.info(`Getting delivery partner with ID ${id}`);

  return deliveryPartnerRepository.findById(id);
};

export const deleteDeliveryPartner = async (
  deliveryPartnerId: string,
): Promise<DeliveryPartnerDocument | null> => {
  try {
    logger.info(
      `Deleting delivery partner with ID ${deliveryPartnerId}`,
    );

    const deletedDeliveryPartner =
      await deliveryPartnerRepository.deleteDeliveryPartner(
        deliveryPartnerId,
      );

    if (!deletedDeliveryPartner) {
      throw new Error(
        `Delivery partner with ID ${deliveryPartnerId} not found`,
      );
    }

    logger.info("Delivery partner deleted successfully", {
      deliveryPartnerId,
    });

    return deletedDeliveryPartner;
  } catch (error: any) {
    logger.error("Error deleting delivery partner", {
      deliveryPartnerId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateDeliveryPartnerStatus = async (
  id: string,
  updatedData: Partial<DeliveryPartnerDocument>,
): Promise<DeliveryPartnerDocument | null> => {
  try {
    logger.info(
      `Updating status for delivery partner with ID ${id} to ${updatedData.status}`,
    );

    const updatedDeliveryPartner =
      await deliveryPartnerRepository.changeDeliveryPartnerStatus(
        id,
        updatedData,
      );

    if (!updatedDeliveryPartner) {
      throw new Error(
        `Delivery partner with ID ${id} not found`,
      );
    }

    logger.info("Delivery partner status updated successfully", {
      deliveryPartnerId: id,
      status: updatedData.status,
    });

    return updatedDeliveryPartner;
  } catch (error: any) {
    logger.error("Error updating delivery partner status", {
      deliveryPartnerId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};