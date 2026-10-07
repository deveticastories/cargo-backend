import { Response } from "express";
import * as fabricService from "./fabricService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createFabric = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const fabricData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdFabric =
      await fabricService.createFabric(fabricData);

    return res.status(201).json({
      success: true,
      message: message.FABRIC_CREATED,
      fabric: createdFabric,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editFabric = async (
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
      message: message.INVALID_FABRIC_ID,
    });
  }

  try {
    const existingFabric =
      await fabricService.getFabricById(id);

    if (!existingFabric) {
      return res.status(404).json({
        success: false,
        message: message.FABRIC_NOT_FOUND,
      });
    }

    const fabricData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedFabric =
      await fabricService.editFabric(
        id,
        fabricData,
      );

    return res.status(200).json({
      success: true,
      message: message.FABRIC_UPDATED,
      fabric: updatedFabric,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFabric = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: message.INVALID_FABRIC_ID,
      });
    }

    const deletedFabric =
      await fabricService.deleteFabric(id);

    if (!deletedFabric) {
      return res.status(404).json({
        success: false,
        message: message.FABRIC_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.FABRIC_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFabricById = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: message.INVALID_FABRIC_ID,
      });
    }

    const fabric =
      await fabricService.getFabricById(id);

    if (!fabric) {
      return res.status(404).json({
        success: false,
        message: message.FABRIC_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      fabric,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllFabrics = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const fabrics =
      await fabricService.getAllFabrics();

    return res.status(200).json({
      success: true,
      fabrics,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateFabricStatus = async (
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
      message: message.INVALID_FABRIC_ID,
    });
  }

  try {
    const fabricStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedFabric =
      await fabricService.updateFabricStatus(
        id,
        fabricStatusUpdateData,
      );

    if (!updatedFabric) {
      return res.status(404).json({
        success: false,
        message: message.FABRIC_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.FABRIC_STATUS_UPDATED,
      fabric: updatedFabric,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};