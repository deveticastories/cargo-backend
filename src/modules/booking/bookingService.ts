import { BookingDocument } from "../../models/bookingModel.js";
import * as bookingRepository from "./bookingRepository.js";

export const createBooking = async (
  bookingData: Partial<BookingDocument>,
): Promise<BookingDocument> => {
  try {
    const lastBooking =
      await bookingRepository.getLastBooking();

    let nextNumber = 1;

    if (lastBooking?.bookingId) {
      const lastNumber = parseInt(
        lastBooking.bookingId.replace("BKG-", ""),
        10,
      );

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const bookingId = `BKG-${String(nextNumber).padStart(4, "0")}`;

    // Ready to Ship -> bundle = bundleCount
    // Repacking Required -> bundle = null
    const bundle =
      bookingData.packingStatus === "Ready to Ship"
        ? bookingData.bundleCount || 0
        : null;

    const booking = await bookingRepository.create({
      ...bookingData,
      bookingId,
      bundle,
    });

    return booking;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to create booking",
    );
  }
};

export const getAllBookings = async () => {
  try {
    const bookings =
      await bookingRepository.getAllBookings();

    let bundle = 0;
    let box = 0;
    let cbm = 0;
    let kg = 0;

    for (const booking of bookings) {
      const quantity = booking.bundleCount || 0;

      switch (booking.bundleType) {
        case "Bundle":
          bundle += booking.bundle || 0;
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
      totalBookings: bookings.length,
      bookingList: bookings,
      bundle,
      box,
      cbm,
      kg,
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get bookings",
    );
  }
};

export const getBookingById = async (
  id: string,
): Promise<BookingDocument | null> => {
  try {
    return await bookingRepository.findById(id);
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get booking",
    );
  }
};

export const editBooking = async (
  id: string,
  bookingData: Partial<BookingDocument>,
): Promise<BookingDocument | null> => {
  try {
    const bundle =
      bookingData.packingStatus === "Ready to Ship"
        ? bookingData.bundleCount || 0
        : bookingData.packingStatus === "Repacking Required"
          ? null
          : bookingData.bundle;

    const booking =
      await bookingRepository.updateById(id, {
        ...bookingData,
        bundle,
      });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update booking",
    );
  }
};

export const deleteBooking = async (
  id: string,
): Promise<BookingDocument | null> => {
  try {
    const booking =
      await bookingRepository.deleteBooking(id);

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to delete booking",
    );
  }
};

export const updateBookingStatus = async (
  id: string,
  status: boolean,
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  try {
    const booking =
      await bookingRepository.changeBookingStatus(
        id,
        status,
        updatedBy,
      );

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update booking status",
    );
  }
};
export const updatePackageListStatus = async (
  id: string,
  packageListStatus: "Added" | "Pending",
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  try {
    const booking =
      await bookingRepository.changePackageListStatus(
        id,
        packageListStatus,
        updatedBy,
      );

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update package list status",
    );
  }
};

export const updateStuffStatus = async (
  id: string,
  stuffStatus: "Pending" | "Stuffed",
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  try {
    const booking =
      await bookingRepository.changeStuffStatus(
        id,
        stuffStatus,
        updatedBy,
      );

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update stuff status",
    );
  }
};