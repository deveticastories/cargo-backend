
import mongoose from "mongoose";
import { CreditNoteDocument } from "../../models/creditNoteModel.js";
import * as creditNoteRepository from "./creditNoteRepository.js";
import logger from "../../utils/logger.js";
import { message } from "../../constants/responseMessage.js";

export const createCreditNote = async (
  creditNoteData: Partial<CreditNoteDocument>,
  createdBy: mongoose.Types.ObjectId,
): Promise<CreditNoteDocument> => {
  try {
    return await creditNoteRepository.create({
      ...creditNoteData,
      createdBy,
      updatedBy: createdBy,
    });
  } catch (error: any) {
    logger.error("Failed to create credit note", error);
    throw new Error(
      error?.message || message.CREDIT_NOTE_CREATED_FAILED,
    );
  }
};

export const getAllCreditNotes = async (): Promise<
  CreditNoteDocument[]
> => {
  try {
    return await creditNoteRepository.getAllCreditNotes();
  } catch (error: any) {
    logger.error("Failed to fetch credit notes", error);
    throw new Error(
      error?.message || message.CREDIT_NOTES_FETCH_FAILED,
    );
  }
};

export const getCreditNoteById = async (
  id: string,
): Promise<CreditNoteDocument | null> => {
  try {
    return await creditNoteRepository.findById(id);
  } catch (error: any) {
    logger.error("Failed to fetch credit note", error);
    throw new Error(
      error?.message || message.CREDIT_NOTE_FETCH_FAILED,
    );
  }
};

export const editCreditNote = async (
  id: string,
  creditNoteData: Partial<CreditNoteDocument>,
  updatedBy: mongoose.Types.ObjectId,
): Promise<CreditNoteDocument | null> => {
  try {
    const creditNote = await creditNoteRepository.updateById(id, {
      ...creditNoteData,
      updatedBy,
      userUpdatedDate: new Date(),
    });

    if (!creditNote) {
      throw new Error(message.CREDIT_NOTE_NOT_FOUND);
    }

    return creditNote;
  } catch (error: any) {
    logger.error("Failed to update credit note", error);
    throw new Error(error?.message || message.CREDIT_NOTE_UPDATED_FAILED);
  }
};

export const deleteCreditNote = async (
  id: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<CreditNoteDocument | null> => {
  try {
    const creditNote = await creditNoteRepository.deleteCreditNote(
      id,
      deletedBy,
    );

    if (!creditNote) {
      throw new Error(message.CREDIT_NOTE_NOT_FOUND);
    }

    return creditNote;
  } catch (error: any) {
    logger.error("Failed to delete credit note", error);
    throw new Error(error?.message || message.CREDIT_NOTE_DELETED_FAILED);
  }
};
