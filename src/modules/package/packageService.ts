import mongoose from "mongoose";

import { PackageDocument } from "../../models/packageModel.js";
import * as packageRepository from "./packageRepository.js";
import * as bookingRepository from "../booking/bookingRepository.js"

export const createPackage = async (
  packageData: Partial<PackageDocument>,
): Promise<PackageDocument> => {
  try {
    if (!packageData.booking) {
      throw new Error("Booking is required");
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        packageData.booking.toString(),
      )
    ) {
      throw new Error("Invalid booking ID");
    }

    const existingPackage =
      await packageRepository.findByBooking(
        packageData.booking.toString(),
      );

    if (existingPackage) {
      throw new Error(
        "Package already exists for this booking",
      );
    }

    const booking =
      await bookingRepository.findById(
        packageData.booking.toString(),
      );

    if (!booking) {
      throw new Error("Booking not found");
    }

    const createdPackage =
      await packageRepository.create(packageData);

    const bundleAfterPacked =
      booking.packingStatus === "Ready to Ship"
        ? booking.bundleCount
        : createdPackage.bundles.length;

    const updatedBooking =
      await bookingRepository.updateById(
        booking._id.toString(),
        {
          bundle: bundleAfterPacked,
          packageListStatus: "Added",
        },
      );

    if (!updatedBooking) {
      throw new Error("Failed to update booking");
    }

    return createdPackage;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to create package",
    );
  }
};
export const getAllPackages = async () => {
  try {
    const packages =
      await packageRepository.getAllPackages();

    return {
      totalPackages: packages.length,
      packageList: packages,
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get packages",
    );
  }
};

export const getPackageById = async (
  id: string,
): Promise<PackageDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid package ID");
    }

    const packageDoc =
      await packageRepository.findById(id);

    if (!packageDoc) {
      throw new Error("Package not found");
    }

    return packageDoc;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get package",
    );
  }
};

export const getPackageByBooking = async (
  bookingId: string,
): Promise<PackageDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid booking ID");
    }

    const packageDoc =
      await packageRepository.findByBooking(bookingId);

    if (!packageDoc) {
      throw new Error("Package not found");
    }

    return packageDoc;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get package",
    );
  }
};

export const updatePackage = async (
  id: string,
  updateData: Partial<PackageDocument>,
): Promise<PackageDocument | null> => {
  try {
    const updatedPackage =
      await packageRepository.updateById(
        id,
        updateData,
      );

    if (!updatedPackage) {
      throw new Error("Package not found");
    }

    const booking =
      await bookingRepository.findById(
        updatedPackage.booking.toString(),
      );

    if (!booking) {
      throw new Error("Booking not found");
    }

    const bundleAfterPacked =
      booking.packingStatus === "Ready to Ship"
        ? booking.bundleCount
        : updatedPackage.bundles.length;

    await bookingRepository.updateById(
      booking._id.toString(),
      {
        bundle: bundleAfterPacked,
      },
    );

    return updatedPackage;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update package",
    );
  }
};

export const deletePackage = async (
  id: string,
): Promise<PackageDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid package ID");
    }

    const packageDoc =
      await packageRepository.deletePackage(id);

    if (!packageDoc) {
      throw new Error("Package not found");
    }

    return packageDoc;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to delete package",
    );
  }
};
export const getPackageForDownload =
  async (
    id: string,
  ): Promise<PackageDocument> => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {
        throw new Error(
          "Invalid package ID",
        );
      }

      const packageDoc =
        await packageRepository.findById(id);

      if (!packageDoc) {
        throw new Error(
          "Package not found",
        );
      }

      return packageDoc;
    } catch (error: any) {
      throw new Error(
        error?.message ||
        "Failed to get package",
      );
    }
  };