import { Response } from "express";
import * as unitService from "./unitService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createUnit = async (
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

    const unitData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdUnit =
      await unitService.createUnit(unitData);

    return res.status(201).json({
      success: true,
      message: message.UNIT_CREATED,
      unit: createdUnit,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editUnit = async (
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
      message: message.INVALID_UNIT_ID,
    });
  }

  try {
    const existingUnit =
      await unitService.getUnitById(id);

    if (!existingUnit) {
      return res.status(404).json({
        success: false,
        message: message.UNIT_NOT_FOUND,
      });
    }

    const unitData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedUnit =
      await unitService.editUnit(id, unitData);

    return res.status(200).json({
      success: true,
      message: message.UNIT_UPDATED,
      unit: updatedUnit,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUnit = async (
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
        message: message.INVALID_UNIT_ID,
      });
    }

    const deletedUnit =
      await unitService.deleteUnit(id);

    if (!deletedUnit) {
      return res.status(404).json({
        success: false,
        message: message.UNIT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.UNIT_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUnitById = async (
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
        message: message.INVALID_UNIT_ID,
      });
    }

    const unit =
      await unitService.getUnitById(id);

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: message.UNIT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      unit,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUnits = async (
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

    const units =
      await unitService.getAllUnits();

    return res.status(200).json({
      success: true,
      units,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUnitStatus = async (
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
      message: message.INVALID_UNIT_ID,
    });
  }

  try {
    const unitStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedUnit =
      await unitService.updateUnitStatus(
        id,
        unitStatusUpdateData,
      );

    if (!updatedUnit) {
      return res.status(404).json({
        success: false,
        message: message.UNIT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.UNIT_STATUS_UPDATED,
      unit: updatedUnit,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};