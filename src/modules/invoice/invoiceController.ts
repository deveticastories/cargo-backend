
import { Request, Response } from "express";
import mongoose from "mongoose";
import * as invoiceService from "./invoiceService.js";
import { message } from "../../constants/responseMessage.js";
import { RequestWithAuthData } from "../../@types/express";
export const createInvoice = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    const { container, booking, deliveryPartner } = req.body;

    if (!container || !booking || !deliveryPartner) {
      res.status(400).json({
        success: false,
        message: message.INVOICE_REQUIRED_FIELDS,
      });
      return;
    }

    const invoice = await invoiceService.createInvoice({
      container,
      booking,
      deliveryPartner,
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message: message.INVOICE_CREATE_SUCCESS,
      data: invoice,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : message.INVOICE_CREATE_FAILED;

    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const getAllInvoices = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await invoiceService.getAllInvoices();

    res.status(200).json({
      success: true,
      message: message.INVOICE_LIST_SUCCESS,
      ...result,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: message.INVOICE_LIST_FAILED,
    });
  }
};

export const getInvoiceById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id.toString())) {
      res.status(400).json({
        success: false,
        message: message.INVALID_INVOICE_ID,
      });
      return;
    }

    const invoice = await invoiceService.getInvoiceById(id.toString());

    res.status(200).json({
      success: true,
      message: message.INVOICE_DETAILS_SUCCESS,
      data: invoice,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : message.INVOICE_DETAILS_FAILED;

    const notFound = errorMessage === "Invoice not found";

    res.status(notFound ? 404 : 500).json({
      success: false,
      message: notFound
        ? message.INVOICE_NOT_FOUND
        : errorMessage,
    });
  }
};
