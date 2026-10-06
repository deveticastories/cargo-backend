import { Response } from "express";
import * as countryService from "./countryService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createCountry = async (
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

    const countryData = {
      ...req.body,
    };

    const createdCountry =
      await countryService.createCountry(countryData);

    return res.status(201).json({
      success: true,
      message: message.COUNTRY_CREATED,
      country: createdCountry,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editCountry = async (
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
      message: message.INVALID_COUNTRY_ID,
    });
  }

  try {
    const existingCountry =
      await countryService.getCountryById(id);

    if (!existingCountry) {
      return res.status(404).json({
        success: false,
        message: message.COUNTRY_NOT_FOUND,
      });
    }

    const countryData = {
      ...req.body,
    };

    const updatedCountry =
      await countryService.editCountry(
        id,
        countryData,
      );

    return res.status(200).json({
      success: true,
      message: message.COUNTRY_UPDATED,
      country: updatedCountry,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCountry = async (
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
        message: message.INVALID_COUNTRY_ID,
      });
    }

    const deletedCountry =
      await countryService.deleteCountry(id);

    if (!deletedCountry) {
      return res.status(404).json({
        success: false,
        message: message.COUNTRY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.COUNTRY_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCountryById = async (
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
        message: message.INVALID_COUNTRY_ID,
      });
    }

    const country =
      await countryService.getCountryById(id);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: message.COUNTRY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      country,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCountries = async (
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

    const countries =
      await countryService.getAllCountries();

    return res.status(200).json({
      success: true,
      countries,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCountryStatus = async (
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
      message: message.INVALID_COUNTRY_ID,
    });
  }

  try {
    const updatedCountry =
      await countryService.updateCountryStatus(
        id,
        req.body,
      );

    if (!updatedCountry) {
      return res.status(404).json({
        success: false,
        message: message.COUNTRY_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.COUNTRY_STATUS_UPDATED,
      country: updatedCountry,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};