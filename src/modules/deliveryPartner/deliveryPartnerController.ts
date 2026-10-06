import { Response } from "express";
import * as deliveryPartnerService from "./deliveryPartnerService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createDeliveryPartner = async (
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

    const deliveryPartnerData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdDeliveryPartner =
      await deliveryPartnerService.createDeliveryPartner(
        deliveryPartnerData,
      );

    return res.status(201).json({
      success: true,
      message: message.DELIVERY_PARTNER_CREATED,
      deliveryPartner: createdDeliveryPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editDeliveryPartner = async (
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
      message: message.INVALID_DELIVERY_PARTNER_ID,
    });
  }

  try {
    const existingDeliveryPartner =
      await deliveryPartnerService.getDeliveryPartnerById(id);

    if (!existingDeliveryPartner) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_PARTNER_NOT_FOUND,
      });
    }

    const deliveryPartnerData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedDeliveryPartner =
      await deliveryPartnerService.editDeliveryPartner(
        id,
        deliveryPartnerData,
      );

    return res.status(200).json({
      success: true,
      message: message.DELIVERY_PARTNER_UPDATED,
      deliveryPartner: updatedDeliveryPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDeliveryPartner = async (
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
        message: message.INVALID_DELIVERY_PARTNER_ID,
      });
    }

    const deletedDeliveryPartner =
      await deliveryPartnerService.deleteDeliveryPartner(id);

    if (!deletedDeliveryPartner) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_PARTNER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DELIVERY_PARTNER_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDeliveryPartnerById = async (
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
        message: message.INVALID_DELIVERY_PARTNER_ID,
      });
    }

    const deliveryPartner =
      await deliveryPartnerService.getDeliveryPartnerById(id);

    if (!deliveryPartner) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_PARTNER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      deliveryPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDeliveryPartners = async (
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

    const deliveryPartners =
      await deliveryPartnerService.getAllDeliveryPartners();

    return res.status(200).json({
      success: true,
      deliveryPartners,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDeliveryPartnerStatus = async (
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
      message: message.INVALID_DELIVERY_PARTNER_ID,
    });
  }

  try {
    const deliveryPartnerStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedDeliveryPartner =
      await deliveryPartnerService.updateDeliveryPartnerStatus(
        id,
        deliveryPartnerStatusUpdateData,
      );

    if (!updatedDeliveryPartner) {
      return res.status(404).json({
        success: false,
        message: message.DELIVERY_PARTNER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.DELIVERY_PARTNER_STATUS_UPDATED,
      deliveryPartner: updatedDeliveryPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};