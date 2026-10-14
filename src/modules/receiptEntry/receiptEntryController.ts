
import mongoose from "mongoose";
import { Request, Response } from "express";
import * as receiptEntryService from "./receiptEntryService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";
export const createReceiptEntry = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
      return;
    }

    const {
      invoice,
      date,
      receivableAmount,
      receivedAmount,
      receivedDate,
      deliveryPartnerAmount,
      deliveryPartnerStatus,
    } = req.body;

    if (!invoice || !mongoose.isValidObjectId(invoice)) {
      res.status(400).json({
        success: false,
        message: message.INVALID_INVOICE_ID,
      });
      return;
    }

    const amounts = [
      receivableAmount,
      receivedAmount,
      deliveryPartnerAmount ?? 0,
    ];

    if (
      receivableAmount === undefined ||
      receivableAmount === null ||
      receivableAmount === "" ||
      receivedAmount === undefined ||
      receivedAmount === null ||
      receivedAmount === "" ||
      amounts.some(
        (amount) =>
          !Number.isFinite(Number(amount)) || Number(amount) < 0,
      )
    ) {
      res.status(400).json({
        success: false,
        message: message.INVALID_AMOUNTS,
      });
      return;
    }

    if (
      deliveryPartnerStatus !== undefined &&
      !["Pending", "Paid"].includes(deliveryPartnerStatus)
    ) {
      res.status(400).json({
        success: false,
        message: message.INVALID_DELIVERY_PARTNER_STATUS,
      });
      return;
    }

    const receiptEntry = await receiptEntryService.createReceiptEntry(
      {
        invoice,
        ...(date !== undefined && { date }),
        receivableAmount: Number(receivableAmount),
        receivedAmount: Number(receivedAmount),
        ...(receivedDate !== undefined && { receivedDate }),
        deliveryPartnerAmount: Number(deliveryPartnerAmount ?? 0),
        ...(deliveryPartnerStatus !== undefined && {
          deliveryPartnerStatus,
        }),
      },
      new mongoose.Types.ObjectId(req.userId),
    );

    res.status(201).json({
      success: true,
      message: message.RECEIPT_ENTRY_CREATED,
      receiptEntry,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error?.message || message.RECEIPT_ENTRY_CREATED_FAILED,
    });
  }
};

export const getAllReceiptEntries = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
      return;
    }

    const receiptEntries =
      await receiptEntryService.getAllReceiptEntries();

    res.status(200).json({
      success: true,
      message: message.RECEIPT_ENTRIES_FETCHED,
      ...receiptEntries,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: message.RECEIPT_ENTRIES_FETCH_FAILED,
    });
  }
};

export const getReceiptEntryById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
      return;
    }

    const { id } = req.params;

    if (Array.isArray(id) || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: message.INVALID_RECEIPT_ENTRY_ID,
      });
      return;
    }

    const receiptEntry =
      await receiptEntryService.getReceiptEntryById(id);

    if (!receiptEntry) {
      res.status(404).json({
        success: false,
        message: message.RECEIPT_ENTRY_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: message.RECEIPT_ENTRY_FETCHED,
      receiptEntry,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: message.RECEIPT_ENTRY_FETCH_FAILED,
    });
  }
};

export const editReceiptEntry = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
      return;
    }

    const { id } = req.params;

    if (Array.isArray(id) || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: message.INVALID_RECEIPT_ENTRY_ID,
      });
      return;
    }

    const {
      invoice,
      date,
      receivableAmount,
      receivedAmount,
      receivedDate,
      deliveryPartnerAmount,
      deliveryPartnerStatus,
    } = req.body;

    if (
      invoice !== undefined &&
      (!invoice || !mongoose.isValidObjectId(invoice))
    ) {
      res.status(400).json({
        success: false,
        message: message.INVALID_INVOICE_ID,
      });
      return;
    }

    const amountsToValidate = [
      receivableAmount,
      receivedAmount,
      deliveryPartnerAmount,
    ].filter((amount) => amount !== undefined);

    if (
      amountsToValidate.some(
        (amount) =>
          amount === "" ||
          !Number.isFinite(Number(amount)) ||
          Number(amount) < 0,
      )
    ) {
      res.status(400).json({
        success: false,
        message: message.INVALID_AMOUNTS,
      });
      return;
    }

    if (
      deliveryPartnerStatus !== undefined &&
      !["Pending", "Paid"].includes(deliveryPartnerStatus)
    ) {
      res.status(400).json({
        success: false,
        message: message.INVALID_DELIVERY_PARTNER_STATUS,
      });
      return;
    }

    if (
      invoice === undefined &&
      date === undefined &&
      receivableAmount === undefined &&
      receivedAmount === undefined &&
      receivedDate === undefined &&
      deliveryPartnerAmount === undefined &&
      deliveryPartnerStatus === undefined
    ) {
      res.status(400).json({
        success: false,
        message: message.RECEIPT_ENTRY_UPDATE_DATA_REQUIRED,
      });
      return;
    }

    const updatedReceiptEntry =
      await receiptEntryService.editReceiptEntry(
        id,
        {
          ...(invoice !== undefined && { invoice }),
          ...(date !== undefined && { date }),
          ...(receivableAmount !== undefined && {
            receivableAmount: Number(receivableAmount),
          }),
          ...(receivedAmount !== undefined && {
            receivedAmount: Number(receivedAmount),
          }),
          ...(receivedDate !== undefined && { receivedDate }),
          ...(deliveryPartnerAmount !== undefined && {
            deliveryPartnerAmount: Number(deliveryPartnerAmount),
          }),
          ...(deliveryPartnerStatus !== undefined && {
            deliveryPartnerStatus,
          }),
        },
        new mongoose.Types.ObjectId(req.userId),
      );

    res.status(200).json({
      success: true,
      message: message.RECEIPT_ENTRY_UPDATED,
      receiptEntry: updatedReceiptEntry,
    });
  } catch (error: any) {
    const notFound =
      error?.message === "Receipt Entry not found";

    res.status(notFound ? 404 : 500).json({
      success: false,
      message: notFound
        ? message.RECEIPT_ENTRY_NOT_FOUND
        : message.RECEIPT_ENTRY_UPDATED_FAILED,
    });
  }
};

export const deleteReceiptEntry = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
      return;
    }

    const { id } = req.params;

    if (Array.isArray(id) || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: message.INVALID_RECEIPT_ENTRY_ID,
      });
      return;
    }

    const receiptEntry = await receiptEntryService.deleteReceiptEntry(
      id,
      new mongoose.Types.ObjectId(req.userId),
    );

    res.status(200).json({
      success: true,
      message: message.RECEIPT_ENTRY_DELETED,
      receiptEntry,
    });
  } catch (error: any) {
    const notFound =
      error?.message === "Receipt Entry not found";

    res.status(notFound ? 404 : 500).json({
      success: false,
      message: notFound
        ? message.RECEIPT_ENTRY_NOT_FOUND
        : message.RECEIPT_ENTRY_DELETED_FAILED,
    });
  }
};
export const changeDeliveryPartnerStatus = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
      return;
    }

    const { id } = req.params;
    const { deliveryPartnerStatus } = req.body;

    if (Array.isArray(id) || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: message.INVALID_RECEIPT_ENTRY_ID,
      });
      return;
    }

    if (
      !["Pending", "Paid"].includes(deliveryPartnerStatus)
    ) {
      res.status(400).json({
        success: false,
        message: message.INVALID_DELIVERY_PARTNER_STATUS,
      });
      return;
    }

    const receiptEntry =
      await receiptEntryService.changeDeliveryPartnerStatus(
        id,
        deliveryPartnerStatus as "Pending" | "Paid",
        new mongoose.Types.ObjectId(req.userId),
      );

    res.status(200).json({
      success: true,
      message: message.DELIVERY_PARTNER_STATUS_UPDATED,
      receiptEntry,
    });
  } catch (error: any) {
    const notFound =
      error?.message === message.RECEIPT_ENTRY_NOT_FOUND;

    const invalidId =
      error?.message === message.INVALID_RECEIPT_ENTRY_ID;

    res.status(notFound ? 404 : invalidId ? 400 : 500).json({
      success: false,
      message: notFound
        ? message.RECEIPT_ENTRY_NOT_FOUND
        : invalidId
          ? message.INVALID_RECEIPT_ENTRY_ID
          : message.DELIVERY_PARTNER_STATUS_UPDATE_FAILED,
    });
  }
};