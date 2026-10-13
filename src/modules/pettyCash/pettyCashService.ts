
import mongoose from "mongoose";
import PettyCash from "../../models/pettyCashModel.js";
import CreditNote from "../../models/creditNoteModel.js";
import DailyExpense from "../../models/dailyExpenseModel.js";

export const updatePettyCashBalance = async () => {
  let pettyCash = await PettyCash.findOne({
    isDeleted: false,
  });

  if (!pettyCash) {
    pettyCash = new PettyCash({
      pettyCashBalance: 0,
      balanceAfterExpenses: 0,
    });
  }

  const creditNotes = await CreditNote.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const expenses = await DailyExpense.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalCreditNotes = creditNotes[0]?.total ?? 0;
  const totalExpenses = expenses[0]?.total ?? 0;

  pettyCash.pettyCashBalance = totalCreditNotes;

  pettyCash.balanceAfterExpenses =
    totalCreditNotes - totalExpenses;

  await pettyCash.save();

  return pettyCash;
};

export const createOpeningPettyCash = async (
  openingBalance: number,
  createdBy?: mongoose.Types.ObjectId,
) => {
  try {
    console.log("========== CREATE OPENING PETTY CASH ==========");
    console.log("Opening balance received:", openingBalance);
    console.log("Created by:", createdBy);

    if (!Number.isFinite(openingBalance) || openingBalance < 0) {
      throw new Error("Opening balance must be a non-negative number");
    }

    console.log("Database name:", mongoose.connection.name);
    console.log("Collection name:", PettyCash.collection.name);

    let pettyCash = await PettyCash.findOne({
      isDeleted: false,
    });

    console.log("Existing Petty Cash record:", pettyCash);

    if (!pettyCash) {
      console.log("No record found. Creating new Petty Cash record...");

      pettyCash = new PettyCash({
        pettyCashBalance: openingBalance,
        balanceAfterExpenses: openingBalance,
        ...(createdBy && {
          createdBy,
          updatedBy: createdBy,
        }),
      });
    } else {
      console.log("Existing record found. Updating opening balance...");

      pettyCash.pettyCashBalance = openingBalance;

      if (createdBy) {
        pettyCash.updatedBy = createdBy;
      }
    }

    await pettyCash.save();

    console.log("Petty Cash saved successfully!");
    console.log("Saved document ID:", pettyCash._id);
    console.log("Saved document:", pettyCash.toObject());

    const updatedPettyCash = await updatePettyCashBalance();

    console.log("Petty Cash balance recalculated successfully!");
    console.log("Final Petty Cash record:", updatedPettyCash?.toObject?.() ?? updatedPettyCash);
    console.log("========== END PETTY CASH ==========");

    return updatedPettyCash;
  } catch (error) {
    console.error("Error in createOpeningPettyCash:", error);
    throw error;
  }
};
