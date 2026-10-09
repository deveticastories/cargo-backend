
import { Response } from "express";
import mongoose from "mongoose";

import * as stuffingService from "./stuffingService.js";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createStuffing = async (
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
    const stuffing = await stuffingService.createStuffing({
      ...req.body,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: message.STUFFING_CREATED,
      data: stuffing,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error?.message || "Failed to create stuffing",
    });
  }
};

export const getAllStuffings = async (
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
    const result =
      await stuffingService.getAllStuffings();

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error?.message || "Failed to get stuffings",
    });
  }
};

export const getStuffingById = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id.toString())) {
    return res.status(400).json({
      success: false,
      message: message.INVALID_STUFFING_ID,
    });
  }

  try {
    const stuffing =
      await stuffingService.getStuffingById(
        req.params.id.toString(),
      );

    return res.status(200).json({
      success: true,
      data: stuffing,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === "Stuffing not found" ? 404 : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || "Failed to get stuffing",
    });
  }
};

