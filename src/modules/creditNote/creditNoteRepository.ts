
import mongoose from "mongoose";
import CreditNote, {
  CreditNoteDocument,
} from "../../models/creditNoteModel";

export const create = async (
  creditNoteData: Partial<CreditNoteDocument>,
): Promise<CreditNoteDocument> => {
  const creditNote = new CreditNote(creditNoteData);

  return await creditNote.save();
};

export const findById = async (
  id: string,
): Promise<CreditNoteDocument | null> => {
  return CreditNote.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<CreditNoteDocument>,
): Promise<CreditNoteDocument | null> => {
  return CreditNote.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        ...updateData,
        userUpdatedDate: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
};

export const getAllCreditNotes = async (): Promise<
  CreditNoteDocument[]
> => {
  return CreditNote.find({
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteCreditNote = async (
  id: string,
  deletedBy?: mongoose.Types.ObjectId,
): Promise<CreditNoteDocument | null> => {
  return CreditNote.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        ...(deletedBy && { deletedBy }),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
};
