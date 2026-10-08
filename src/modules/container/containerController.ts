import { Response } from "express";
import mongoose from "mongoose";
import * as containerService from "./containerService.js";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createContainer = async (
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
    const container = await containerService.createContainer({
      ...req.body,
      createdBy: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: message.CONTAINER_CREATED,
      data: container,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error?.message || message.CONTAINER_CREATED,
    });
  }
};

export const getAllContainers = async (
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
      await containerService.getAllContainers();

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error?.message || "Failed to get containers",
    });
  }
};

export const getContainerById = async (
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
      message: message.INVALID_CONTAINER_ID,
    });
  }

  try {
    const container =
      await containerService.getContainerById(
        req.params.id.toString(),
      );

    return res.status(200).json({
      success: true,
      data: container,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === message.CONTAINER_NOT_FOUND
        ? 404
        : 500;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || message.CONTAINER_NOT_FOUND,
    });
  }
};

export const updateContainer = async (
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
      message: message.INVALID_CONTAINER_ID,
    });
  }

  try {
    const container =
      await containerService.updateContainer(
        req.params.id.toString(),
        {
          ...req.body,
          updatedBy: req.userId,
        },
      );

    return res.status(200).json({
      success: true,
      message: message.CONTAINER_UPDATED,
      data: container,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === message.CONTAINER_NOT_FOUND
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || message.CONTAINER_NOT_FOUND,
    });
  }
};

export const deleteContainer = async (
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
      message: message.INVALID_CONTAINER_ID,
    });
  }

  try {
    const container =
      await containerService.deleteContainer(
        req.params.id.toString(),
      );

    return res.status(200).json({
      success: true,
      message: message.CONTAINER_DELETED,
      data: container,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === message.CONTAINER_NOT_FOUND
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || message.CONTAINER_NOT_FOUND,
    });
  }
};

export const updateContainerStatus = async (
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
      message: message.INVALID_CONTAINER_ID,
    });
  }

  const { containerStatus } = req.body;

  if (
    containerStatus !== "Active" &&
    containerStatus !== "Inactive" &&
    containerStatus !== "Stuffed"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "containerStatus must be Active, Inactive, or Stuffed",
    });
  }

  try {
    const container =
      await containerService.updateContainerStatus(
        req.params.id.toString(),
        containerStatus,
        req.userId.toString(),
      );

    return res.status(200).json({
      success: true,
      message: message.CONTAINER_STATUS_UPDATED,
      data: container,
    });
  } catch (error: any) {
    const statusCode =
      error?.message === message.CONTAINER_NOT_FOUND
        ? 404
        : 400;

    return res.status(statusCode).json({
      success: false,
      message:
        error?.message || message.CONTAINER_NOT_FOUND,
    });
  }
};