
import mongoose from "mongoose";
import {
  ReceiptEntryDocument,
} from "../../models/receiptEntryModel.js";
import * as receiptEntryRepository from "./receiptEntryRepository.js";

export const createReceiptEntry = async (
  data: Partial<ReceiptEntryDocument>,
  createdBy: mongoose.Types.ObjectId,
): Promise<ReceiptEntryDocument> => {
  const receivableAmount = Number(data.receivableAmount ?? 0);
  const receivedAmount = Number(data.receivedAmount ?? 0);

  const receiptEntry = await receiptEntryRepository.create({
    ...data,
    balanceAmount: receivableAmount - receivedAmount,
    createdBy,
    updatedBy: createdBy,
  });

  return receiptEntry;
};

export const getAllReceiptEntries = async () => {
  const receiptEntries =
    await receiptEntryRepository.getAllReceiptEntries();

  const totalReceivedAmount = receiptEntries.reduce(
    (total, receiptEntry) => total + Number(receiptEntry.receivedAmount || 0),
    0,
  );

  return {
    totalReceiptEntries: receiptEntries.length,
    totalReceivedAmount,
    receiptEntryList: receiptEntries,
  };
};


export const getReceiptEntryById = async (
  id: string,
): Promise<ReceiptEntryDocument | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Receipt Entry ID");
  }

  return receiptEntryRepository.findById(id);
};

export const editReceiptEntry = async (
  id: string,
  data: Partial<ReceiptEntryDocument>,
  updatedBy: mongoose.Types.ObjectId,
): Promise<ReceiptEntryDocument> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Receipt Entry ID");
  }

  const existingReceiptEntry =
    await receiptEntryRepository.findById(id);

  if (!existingReceiptEntry) {
    throw new Error("Receipt Entry not found");
  }

  const receivableAmount = Number(
    data.receivableAmount ?? existingReceiptEntry.receivableAmount,
  );

  const receivedAmount = Number(
    data.receivedAmount ?? existingReceiptEntry.receivedAmount,
  );

  const receiptEntry = await receiptEntryRepository.updateById(
    id,
    {
      ...data,
      balanceAmount: receivableAmount - receivedAmount,
      updatedBy,
      userUpdatedDate: new Date(),
    },
  );

  if (!receiptEntry) {
    throw new Error("Receipt Entry not found");
  }

  return receiptEntry;
};

export const deleteReceiptEntry = async (
  id: string,
  deletedBy?: mongoose.Types.ObjectId,
): Promise<ReceiptEntryDocument> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Receipt Entry ID");
  }

  const receiptEntry =
    await receiptEntryRepository.deleteReceiptEntry(
      id,
      deletedBy?.toString(),
    );

  if (!receiptEntry) {
    throw new Error("Receipt Entry not found");
  }

  return receiptEntry;
};
export const changeDeliveryPartnerStatus = async (
  id: string,
  deliveryPartnerStatus: "Pending" | "Paid",
  updatedBy: mongoose.Types.ObjectId,
): Promise<ReceiptEntryDocument> => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid receipt entry ID");
  }

  const receiptEntry =
    await receiptEntryRepository.changeDeliveryPartnerStatus(
      id,
      { deliveryPartnerStatus },
      updatedBy,
    );

  if (!receiptEntry) {
    throw new Error("Receipt entry not found");
  }

  return receiptEntry;
};