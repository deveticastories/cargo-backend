
import mongoose from "mongoose";
import DailyExpense, {
  DailyExpenseDocument,
} from "../../models/dailyExpenseModel.js";

export const create = async (
  data: Partial<DailyExpenseDocument>,
  session?: mongoose.ClientSession,
): Promise<DailyExpenseDocument> => {
  const expense = new DailyExpense(data);
  return expense.save({ session });
};

export const findById = async (
  id: string,
  session?: mongoose.ClientSession,
): Promise<DailyExpenseDocument | null> => {
  return DailyExpense.findOne({
    _id: id,
    isDeleted: false,
  })
    .session(session ?? null)
    .exec();
};

export const getAllDailyExpenses = async (
  session?: mongoose.ClientSession,
): Promise<DailyExpenseDocument[]> => {
  return DailyExpense.find({ isDeleted: false })
    .sort({ date: -1, createdAt: -1 })
    .session(session ?? null)
    .exec();
};

export const updateById = async (
  id: string,
  data: Partial<DailyExpenseDocument>,
  session?: mongoose.ClientSession,
): Promise<DailyExpenseDocument | null> => {
  return DailyExpense.findOneAndUpdate(
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
      session,
    },
  ).exec();
};

export const deleteDailyExpense = async (
  id: string,
  deletedBy?: mongoose.Types.ObjectId,
  session?: mongoose.ClientSession,
): Promise<DailyExpenseDocument | null> => {
  const updateData: Record<string, unknown> = {
    isDeleted: true,
    deletedAt: new Date(),
  };

  if (deletedBy) {
    updateData.deletedBy = deletedBy;
  }

  return DailyExpense.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: updateData },
    {
      returnDocument: "after",
      session,
    },
  ).exec();
};

