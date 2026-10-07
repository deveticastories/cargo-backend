import { Response } from "express";
import * as pricingService from "./priceService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createPricing = async (
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

    const pricingData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdPricing =
      await pricingService.createPricing(pricingData);

    return res.status(201).json({
      success: true,
      message: message.PRICING_CREATED,
      pricing: createdPricing,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editPricing = async (
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
      message: message.INVALID_PRICING_ID,
    });
  }

  try {
    const existingPricing =
      await pricingService.getPricingById(id);

    if (!existingPricing) {
      return res.status(404).json({
        success: false,
        message: message.PRICING_NOT_FOUND,
      });
    }

    const pricingData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedPricing =
      await pricingService.editPricing(
        id,
        pricingData,
      );

    return res.status(200).json({
      success: true,
      message: message.PRICING_UPDATED,
      pricing: updatedPricing,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePricing = async (
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
        message: message.INVALID_PRICING_ID,
      });
    }

    const deletedPricing =
      await pricingService.deletePricing(id);

    if (!deletedPricing) {
      return res.status(404).json({
        success: false,
        message: message.PRICING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PRICING_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPricingById = async (
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
        message: message.INVALID_PRICING_ID,
      });
    }

    const pricing =
      await pricingService.getPricingById(id);

    if (!pricing) {
      return res.status(404).json({
        success: false,
        message: message.PRICING_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      pricing,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPricings = async (
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

    const pricings =
      await pricingService.getAllPricings();

    return res.status(200).json({
      success: true,
      pricings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};