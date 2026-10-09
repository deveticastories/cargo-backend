
import mongoose from "mongoose";
import { StuffingDocument } from "../../models/stuffingModel.js";
import * as stuffingRepository from "./stuffingRepository.js"

export const createStuffing = async (
  stuffingData: Partial<StuffingDocument>,
): Promise<StuffingDocument> => {
  try {
    if (!stuffingData.container) {
      throw new Error("Container is required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        stuffingData.container.toString(),
      )
    ) {
      throw new Error("Invalid container ID");
    }

    if (
      !Array.isArray(stuffingData.bookings) ||
      stuffingData.bookings.length === 0
    ) {
      throw new Error("At least one booking is required");
    }

    const invalidBooking = stuffingData.bookings.some(
      (booking) =>
        !mongoose.Types.ObjectId.isValid(booking.toString()),
    );

    if (invalidBooking) {
      throw new Error("Invalid booking ID");
    }

    return await stuffingRepository.create(stuffingData);
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to create stuffing",
    );
  }
};

export const getAllStuffings = async () => {
  try {
    const stuffings =
      await stuffingRepository.getAllStuffings();

    return {
      totalStuffings: stuffings.length,
      stuffingList: stuffings,
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get stuffings",
    );
  }
};

export const getStuffingById = async (
  id: string,
): Promise<StuffingDocument> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid stuffing ID");
    }

    const stuffing =
      await stuffingRepository.findById(id);

    if (!stuffing) {
      throw new Error("Stuffing not found");
    }

    return stuffing;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get stuffing",
    );
  }
};

