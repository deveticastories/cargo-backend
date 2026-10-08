import mongoose from "mongoose";

import { PackageDocument } from "../../models/packageModel.js";
import * as packageRepository from "./packageRepository.js";

export const createPackage = async (
  packageData: Partial<PackageDocument>,
): Promise<PackageDocument> => {
  try {
    if (!packageData.booking) {
      throw new Error("Booking is required");
    }

    if (!mongoose.Types.ObjectId.isValid(packageData.booking.toString())) {
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

    return await packageRepository.create(packageData);
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
  packageData: Partial<PackageDocument>,
): Promise<PackageDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid package ID");
    }

    const packageDoc =
      await packageRepository.updateById(
        id,
        packageData,
      );

    if (!packageDoc) {
      throw new Error("Package not found");
    }

    return packageDoc;
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