
import mongoose from "mongoose";
import ReceiptEntry, {
  ReceiptEntryDocument,
} from "../../models/receiptEntryModel.js";

export const create = async (
  data: Partial<ReceiptEntryDocument>,
): Promise<ReceiptEntryDocument> => {
  const receiptEntry = new ReceiptEntry(data);
  return receiptEntry.save();
};

export const findById = async (
  id: string,
): Promise<ReceiptEntryDocument | null> => {
  return ReceiptEntry.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("invoice")
    .exec();
};

export const getAllReceiptEntries = async (): Promise<
  ReceiptEntryDocument[]
> => {
  return ReceiptEntry.find({ isDeleted: false })
    .populate("invoice")
    .sort({ date: -1 })
    .exec();
};

export const updateById = async (
  id: string,
  data: Partial<ReceiptEntryDocument>,
): Promise<ReceiptEntryDocument | null> => {
  return ReceiptEntry.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      $set: {
        ...data,
        userUpdatedDate: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("invoice")
    .exec();
};

export const deleteReceiptEntry = async (
  id: string,
  deletedBy?: string,
): Promise<ReceiptEntryDocument | null> => {
  const updateData: Record<string, unknown> = {
    isDeleted: true,
    deletedAt: new Date(),
  };

  if (deletedBy) {
    updateData.deletedBy = deletedBy;
  }

  return ReceiptEntry.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: updateData },
    {
      returnDocument: "after",
    },
  ).exec();
};
export const changeDeliveryPartnerStatus = async (
  id: string,
  updatedData: Partial<ReceiptEntryDocument>,
  updatedBy: mongoose.Types.ObjectId,
): Promise<ReceiptEntryDocument | null> => {
  return ReceiptEntry.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      $set: {
        deliveryPartnerStatus: updatedData.deliveryPartnerStatus,
        updatedBy,
        userUpdatedDate: new Date(),
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).exec();
};
