import { Response } from "express";
import * as pickupPartnerService from "./pickupPartnerService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createPickupPartner = async (
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

    const pickupPartnerData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdPickupPartner =
      await pickupPartnerService.createPickupPartner(
        pickupPartnerData,
      );

    return res.status(201).json({
      success: true,
      message: message.PICKUP_PARTNER_CREATED,
      pickupPartner: createdPickupPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editPickupPartner = async (
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
      message: message.INVALID_PICKUP_PARTNER_ID,
    });
  }

  try {
    const existingPickupPartner =
      await pickupPartnerService.getPickupPartnerById(id);

    if (!existingPickupPartner) {
      return res.status(404).json({
        success: false,
        message: message.PICKUP_PARTNER_NOT_FOUND,
      });
    }

    const pickupPartnerData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedPickupPartner =
      await pickupPartnerService.editPickupPartner(
        id,
        pickupPartnerData,
      );

    return res.status(200).json({
      success: true,
      message: message.PICKUP_PARTNER_UPDATED,
      pickupPartner: updatedPickupPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePickupPartner = async (
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
        message: message.INVALID_PICKUP_PARTNER_ID,
      });
    }

    const deletedPickupPartner =
      await pickupPartnerService.deletePickupPartner(id);

    if (!deletedPickupPartner) {
      return res.status(404).json({
        success: false,
        message: message.PICKUP_PARTNER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PICKUP_PARTNER_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPickupPartnerById = async (
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
        message: message.INVALID_PICKUP_PARTNER_ID,
      });
    }

    const pickupPartner =
      await pickupPartnerService.getPickupPartnerById(id);

    if (!pickupPartner) {
      return res.status(404).json({
        success: false,
        message: message.PICKUP_PARTNER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      pickupPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPickupPartners = async (
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

    const pickupPartners =
      await pickupPartnerService.getAllPickupPartners();

    return res.status(200).json({
      success: true,
      pickupPartners,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePickupPartnerStatus = async (
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
      message: message.INVALID_PICKUP_PARTNER_ID,
    });
  }

  try {
    const pickupPartnerStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedPickupPartner =
      await pickupPartnerService.updatePickupPartnerStatus(
        id,
        pickupPartnerStatusUpdateData,
      );

    if (!updatedPickupPartner) {
      return res.status(404).json({
        success: false,
        message: message.PICKUP_PARTNER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PICKUP_PARTNER_STATUS_UPDATED,
      pickupPartner: updatedPickupPartner,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};