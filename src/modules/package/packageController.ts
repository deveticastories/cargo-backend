import { Request, Response } from "express";

import * as packageService from "./packageService.js";
import { message } from "../../constants/responseMessage";

import { RequestWithAuthData } from "../../@types/express";
import { generatePackingListPdf } from "../../utils/generatePackingListPdf.js";

export const createPackage = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const packageDoc =
      await packageService.createPackage(req.body);

    return res.status(201).json({
      success: true,
      message: "Package created successfully",
      data: packageDoc,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to create package",
    });
  }
};

export const getAllPackages = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const result =
      await packageService.getAllPackages();

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to get packages",
    });
  }
};

export const getPackageById = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const packageDoc =
      await packageService.getPackageById(req.params.id.toString());

    return res.status(200).json({
      success: true,
      data: packageDoc,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === "Package not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message: error?.message || "Failed to get package",
    });
  }
};

export const getPackageByBooking = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const packageDoc =
      await packageService.getPackageByBooking(
        req.params.bookingId.toString(),
      );

    return res.status(200).json({
      success: true,
      data: packageDoc,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === "Package not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || "Failed to get package",
    });
  }
};

export const updatePackage = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const packageDoc =
      await packageService.updatePackage(
        req.params.id.toString(),
        req.body,
      );

    return res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: packageDoc,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === "Package not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || "Failed to update package",
    });
  }
};

export const deletePackage = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    await packageService.deletePackage(req.params.id.toString());

    return res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error: any) {
    const statusCode =
      error?.message === "Package not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || "Failed to delete package",
    });
  }
};
export const downloadPackage = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const packageDoc =
      await packageService.getPackageForDownload(
        req.params.id.toString(),
      );

    generatePackingListPdf(
      packageDoc as Parameters<typeof generatePackingListPdf>[0],
      res,
    );
  } catch (error: any) {
    const statusCode =
      error?.message ===
        "Package not found"
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message ||
        "Failed to download packing list",
    });
  }
};