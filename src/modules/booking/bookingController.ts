import { Request, Response } from "express";
import * as bookingService from "./bookingService.js";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createBooking = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  try {
    const bookingData = {
      ...req.body,
      createdBy: req.userId,
    };

    const booking =
      await bookingService.createBooking(bookingData);

    return res.status(201).json({
      success: true,
      message: message.BOOKING_CREATED,
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const getAllBookings = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  const packingStatus = req.query.packingStatus;
  const packageListStatus = req.query.packageListStatus;

  if (
    packingStatus !== undefined &&
    packingStatus !== "Ready to Ship" &&
    packingStatus !== "Repacking Required"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "packingStatus must be Ready to Ship or Repacking Required",
    });
  }

  if (
    packageListStatus !== undefined &&
    packageListStatus !== "Added" &&
    packageListStatus !== "Pending"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "packageListStatus must be Added or Pending",
    });
  }

  try {
    const result = await bookingService.getAllBookings(
      packingStatus as
        | "Ready to Ship"
        | "Repacking Required"
        | undefined,

      packageListStatus as
        | "Added"
        | "Pending"
        | undefined,
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error?.message || "Failed to get bookings",
    });
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_BOOKING_ID,
    });
  }

  try {
    const booking =
      await bookingService.getBookingById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: message.BOOKING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const editBooking = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_BOOKING_ID,
    });
  }

  try {
    const bookingData = {
      ...req.body,
      updatedBy: req.userId,
    };

    const booking =
      await bookingService.editBooking(
        id,
        bookingData,
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: message.BOOKING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.BOOKING_UPDATED,
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const deleteBooking = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_BOOKING_ID,
    });
  }

  try {
    const booking =
      await bookingService.deleteBooking(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: message.BOOKING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.BOOKING_DELETED,
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const updateBookingStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_BOOKING_ID,
    });
  }

  if (typeof req.body.status !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "status must be a boolean",
    });
  }

  try {
    const booking =
      await bookingService.updateBookingStatus(
        id,
        req.body.status,
        req.userId.toString(),
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: message.BOOKING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.BOOKING_STATUS_UPDATED,
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const updatePackageListStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_BOOKING_ID,
    });
  }

  const allowedStatuses = ["Added", "Pending"];

  if (!allowedStatuses.includes(req.body.packageListStatus)) {
    return res.status(400).json({
      success: false,
      message:
        "packageListStatus must be Added or Pending",
    });
  }

  try {
    const booking =
      await bookingService.updatePackageListStatus(
        id,
        req.body.packageListStatus,
        req.userId.toString(),
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: message.BOOKING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Package list status updated successfully",
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export const updateStuffStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_BOOKING_ID,
    });
  }

  const allowedStatuses = ["Pending", "Stuffed" , "Ready to Stuff"];

  if (!allowedStatuses.includes(req.body.stuffStatus)) {
    return res.status(400).json({
      success: false,
      message:
        "stuffStatus must be Pending or Stuffed",
    });
  }

  try {
    const booking =
      await bookingService.updateStuffStatus(
        id,
        req.body.stuffStatus,
        req.userId.toString(),
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: message.BOOKING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stuff status updated successfully",
      booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};