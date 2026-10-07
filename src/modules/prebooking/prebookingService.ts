import { PreBookingDocument } from "../../models/prebookingModel.js";
import logger from "../../utils/logger.js";
import * as preBookingRepository from "./prebookingRepository";

export const createPreBooking = async (
    preBookingData: Partial<PreBookingDocument>,
): Promise<PreBookingDocument> => {
    try {
        logger.info("Creating a new pre-booking", { preBookingData });

        const lastPreBooking =
            await preBookingRepository.getLastPreBooking();

        let nextNumber = 1;

        if (lastPreBooking?.preBookingId) {
            const lastNumber = parseInt(
                lastPreBooking.preBookingId.replace("PBK-", ""),
                10,
            );

            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }

        const preBookingId = `PBK-${String(nextNumber).padStart(4, "0")}`;

        const preBooking =
            await preBookingRepository.create({
                ...preBookingData,
                preBookingId,
            });

        logger.info("Pre-booking created successfully", {
            preBookingId: preBooking.preBookingId,
        });

        return preBooking;
    } catch (error: any) {
        logger.error("Error creating pre-booking", {
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to create pre-booking",
        );
    }
};

export const editPreBooking = async (
    id: string,
    preBookingData: Partial<PreBookingDocument>,
): Promise<PreBookingDocument | null> => {
    try {
        logger.info(`Editing pre-booking with ID ${id}`, {
            preBookingData,
        });

        const updatedPreBooking =
            await preBookingRepository.updateById(
                id,
                preBookingData,
            );

        if (!updatedPreBooking) {
            throw new Error(`Pre-booking with ID ${id} not found`);
        }

        logger.info("Pre-booking updated successfully", {
            preBookingId: id,
        });

        return updatedPreBooking;
    } catch (error: any) {
        logger.error("Error updating pre-booking", {
            preBookingId: id,
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to update pre-booking",
        );
    }
};

export const getPreBookingById = async (
    id: string,
): Promise<PreBookingDocument | null> => {
    try {
        logger.info(`Getting pre-booking with ID ${id}`);

        return await preBookingRepository.findById(id);
    } catch (error: any) {
        logger.error("Error getting pre-booking", {
            preBookingId: id,
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to get pre-booking",
        );
    }
};

export const getAllPreBookings = async () => {
  try {
    const preBookings =
      await preBookingRepository.getAllPreBookings();

    let bundle = 0;
    let box = 0;
    let cbm = 0;
    let kg = 0;

    const totalCollectedBookings = preBookings.filter(
      (preBooking) =>
        preBooking.preBookingStatus === "Collected",
    ).length;

    for (const preBooking of preBookings) {
      const quantity = preBooking.bundleCount || 0;

      switch (preBooking.bundleType) {
        case "Bundle":
          bundle += quantity;
          break;
        case "Box":
          box += quantity;
          break;
        case "CBM":
          cbm += quantity;
          break;
        case "KG":
          kg += quantity;
          break;
      }
    }

    return {
      totalPreBookings: preBookings.length,
      preBookingList: preBookings,
      totalCollectedBookings,
      bundle,
      box,
      cbm,
      kg,
    };
  } catch (error: any) {
    logger.error("Error getting all pre-bookings", {
      error: error?.message,
    });

    throw new Error(
      error?.message || "Failed to get pre-bookings",
    );
  }
};

export const deletePreBooking = async (
    id: string,
): Promise<PreBookingDocument | null> => {
    try {
        logger.info(`Deleting pre-booking with ID ${id}`);

        const deletedPreBooking =
            await preBookingRepository.deletePreBooking(id);

        if (!deletedPreBooking) {
            throw new Error(`Pre-booking with ID ${id} not found`);
        }

        logger.info("Pre-booking deleted successfully", {
            preBookingId: id,
        });

        return deletedPreBooking;
    } catch (error: any) {
        logger.error("Error deleting pre-booking", {
            preBookingId: id,
            error: error?.message,
        });

        throw new Error(
            error?.message || "Failed to delete pre-booking",
        );
    }
};

export const updatePreBookingStatus = async (
    id: string,
    preBookingStatus: "Pending" | "Collected" | "Canceled",
    updatedBy?: string,
): Promise<PreBookingDocument | null> => {
    try {
        logger.info(
            `Updating pre-booking status for ID ${id}`,
            {
                preBookingStatus,
            },
        );

        const updatedPreBooking =
            await preBookingRepository.changePreBookingStatus(
                id,
                preBookingStatus,
                updatedBy,
            );

        if (!updatedPreBooking) {
            throw new Error(
                `Pre-booking with ID ${id} not found`,
            );
        }

        logger.info(
            "Pre-booking status updated successfully",
            {
                preBookingId: id,
                preBookingStatus,
            },
        );

        return updatedPreBooking;
    } catch (error: any) {
        logger.error(
            "Error updating pre-booking status",
            {
                preBookingId: id,
                error: error?.message,
            },
        );

        throw new Error(
            error?.message ||
            "Failed to update pre-booking status",
        );
    }
};