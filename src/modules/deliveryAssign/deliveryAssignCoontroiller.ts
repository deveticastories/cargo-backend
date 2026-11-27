
import { Response } from "express";
import * as deliveryAssignService from "./deliveryAssignService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createDeliveryAssign = async (
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

    const deliveryAssignData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdDeliveryAssign =
      await deliveryAssignService.createDeliveryAssign(
        deliveryAssignData,
      );

    return res.status(201).json({
      success: true,
      message: message.DELIVERY_ASSIGN_CREATED,
      deliveryAssign: createdDeliveryAssign,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editDeliveryAssign = async (
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
      message: message.INVALID_DELIVERY_ASSIGN_ID,
    });
  }

  try {
    const existingDeliveryAssign =
      await deliveryAssignService.getDeliveryAssignById(id);

    if (!existingDeliveryAssign) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_ASSIGN_NOT_FOUND,
      });
    }

    const deliveryAssignData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedDeliveryAssign =
      await deliveryAssignService.editDeliveryAssign(
        id,
        deliveryAssignData,
      );

    return res.status(200).json({
      success: true,
      message: message.DELIVERY_ASSIGN_UPDATED,
      deliveryAssign: updatedDeliveryAssign,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDeliveryAssign = async (
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
        message: message.INVALID_DELIVERY_ASSIGN_ID,
      });
    }

    const deletedDeliveryAssign =
      await deliveryAssignService.deleteDeliveryAssign(id);

    if (!deletedDeliveryAssign) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_ASSIGN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DELIVERY_ASSIGN_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDeliveryAssignById = async (
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
        message: message.INVALID_DELIVERY_ASSIGN_ID,
      });
    }

    const deliveryAssign =
      await deliveryAssignService.getDeliveryAssignById(id);

    if (!deliveryAssign) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_ASSIGN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      deliveryAssign,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDeliveryAssigns = async (
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

    const deliveryAssigns =
      await deliveryAssignService.getAllDeliveryAssigns();

    return res.status(200).json({
      success: true,
      deliveryAssigns,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDeliveryAssignStatus = async (
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
      message: message.INVALID_DELIVERY_ASSIGN_ID,
    });
  }

  try {
    const deliveryAssignStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedDeliveryAssign =
      await deliveryAssignService.updateDeliveryAssignStatus(
        id,
        deliveryAssignStatusUpdateData,
      );

    if (!updatedDeliveryAssign) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_ASSIGN_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DELIVERY_ASSIGN_STATUS_UPDATED,
      deliveryAssign: updatedDeliveryAssign,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
