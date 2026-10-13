
import mongoose from "mongoose";
import {
  DailyExpenseDocument,
} from "../../models/dailyExpenseModel.js";
import * as dailyExpenseRepository from "./dailyExpenseRepository.js";
import { withTransaction } from "../../utils/withTransaction.js";
import {
  updatePettyCashBalance,
} from "../pettyCash/pettyCashService.js";

export const createDailyExpense = async (
  expenseData: Partial<DailyExpenseDocument>,
  createdBy: mongoose.Types.ObjectId,
): Promise<DailyExpenseDocument> => {
  try {
    const expense = await dailyExpenseRepository.create({
      ...expenseData,
      createdBy,
      updatedBy: createdBy,
    });

    // Recalculate Petty Cash after creating the expense
    await updatePettyCashBalance();

    return expense;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to create daily expense",
    );
  }
};


export const updateDailyExpense = async (
  id: string,
  expenseData: Partial<DailyExpenseDocument>,
  updatedBy: mongoose.Types.ObjectId,
): Promise<DailyExpenseDocument> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid daily expense ID");
    }

    const expense = await dailyExpenseRepository.updateById(
      id,
      {
        ...expenseData,
        updatedBy,
      },
    );

    if (!expense) {
      throw new Error("Daily expense not found");
    }

    // Recalculate petty cash after editing the expense
    await updatePettyCashBalance();

    return expense;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update daily expense",
    );
  }
};
export const getDailyExpenseById = async (
  id: string,
): Promise<DailyExpenseDocument | null> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid daily expense ID");
  }

  return dailyExpenseRepository.findById(id);
}
export const getAllDailyExpenses = async (): Promise<DailyExpenseDocument[]> => {
  return dailyExpenseRepository.getAllDailyExpenses();
};
export const deleteDailyExpense = async (
  id: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<DailyExpenseDocument> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid daily expense ID");
    }

    const expense = await dailyExpenseRepository.deleteDailyExpense(
      id,
      deletedBy,
    );

    if (!expense) {
      throw new Error("Daily expense not found");
    }

    // Recalculate petty cash after deleting the expense
    await updatePettyCashBalance();

    return expense;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to delete daily expense",
    );
  }
};
