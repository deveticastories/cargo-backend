import { Response } from "express";
import * as customerService from "./customerService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createCustomer = async (
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

    const customerData = {
      ...req.body,
    };

    const createdCustomer =
      await customerService.createCustomer(customerData);

    return res.status(201).json({
      success: true,
      message: message.CUSTOMER_CREATED,
      customer: createdCustomer,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editCustomer = async (
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
      message: message.INVALID_CUSTOMER_ID,
    });
  }

  try {
    const existingCustomer =
      await customerService.getCustomerById(id);

    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: message.CUSTOMER_NOT_FOUND,
      });
    }

    const customerData = {
      ...req.body,
    };

    const updatedCustomer =
      await customerService.editCustomer(id, customerData);

    return res.status(200).json({
      success: true,
      message: message.CUSTOMER_UPDATED,
      customer: updatedCustomer,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCustomer = async (
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
        message: message.INVALID_CUSTOMER_ID,
      });
    }

    const deletedCustomer =
      await customerService.deleteCustomer(id);

    if (!deletedCustomer) {
      return res.status(404).json({
        success: false,
        message: message.CUSTOMER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CUSTOMER_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomerById = async (
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
        message: message.INVALID_CUSTOMER_ID,
      });
    }

    const customer =
      await customerService.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: message.CUSTOMER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCustomers = async (
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

    const customers =
      await customerService.getAllCustomers();

    return res.status(200).json({
      success: true,
      customers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCustomerStatus = async (
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
      message: message.INVALID_CUSTOMER_ID,
    });
  }

  try {
    const updatedCustomer =
      await customerService.updateCustomerStatus(
        id,
        req.body,
      );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: message.CUSTOMER_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.CUSTOMER_STATUS_UPDATED,
      customer: updatedCustomer,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};