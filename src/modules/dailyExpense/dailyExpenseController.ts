
import { Response } from "express";
import mongoose from "mongoose";
import { RequestWithAuthData } from "../../@types/express.js";
import * as dailyExpenseService from "./dailyExpenseService.js";
import { message } from "../../constants/responseMessage.js";

const isValidPaymentType = (value: unknown): value is "Cash" | "UPI" =>
  value === "Cash" || value === "UPI";

const isValidDate = (value: unknown): boolean =>
  typeof value === "string" &&
  value.trim() !== "" &&
  !Number.isNaN(Date.parse(value));

// Create Daily Expense
export const createDailyExpense = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const { date, expenseType, paymentType, amount, description } = req.body;

    if (
      !isValidDate(date) ||
      typeof expenseType !== "string" ||
      !expenseType.trim() ||
      !isValidPaymentType(paymentType) ||
      amount === undefined ||
      amount === null ||
      amount === "" ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) < 0
    ) {
      res.status(400).json({
        message: message.INVALID_DAILY_EXPENSE_DATA,
      });
      return;
    }

    const expense = await dailyExpenseService.createDailyExpense(
      {
        date: new Date(date),
        expenseType: expenseType.trim(),
        paymentType,
        amount: Number(amount),
        description,
      },
      req.userId,
    );

    res.status(201).json({
      message: message.DAILY_EXPENSE_CREATED,
      data: expense,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || message.DAILY_EXPENSE_CREATED_FAILED,
    });
  }
};

// Get All Daily Expenses
export const getAllDailyExpenses = async (
  _req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    const expenses = await dailyExpenseService.getAllDailyExpenses();

    res.status(200).json({
      message: message.DAILY_EXPENSES_FETCHED,
      data: expenses,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || message.DAILY_EXPENSES_FETCH_FAILED,
    });
  }
};

// Get Daily Expense By ID
export const getDailyExpenseById = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: message.INVALID_DAILY_EXPENSE_ID,
      });
      return;
    }

    const expense = await dailyExpenseService.getDailyExpenseById(id);

    if (!expense) {
      res.status(404).json({
        message: message.DAILY_EXPENSE_NOT_FOUND,
      });
      return;
    }

    res.status(200).json({
      message: message.DAILY_EXPENSE_FETCHED,
      data: expense,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error?.message || message.DAILY_EXPENSE_FETCH_FAILED,
    });
  }
};

// Edit Daily Expense
export const editDailyExpense = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const id = req.params.id;

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: message.INVALID_DAILY_EXPENSE_ID,
      });
      return;
    }

    const {
      date,
      expenseType,
      paymentType,
      amount,
      description,
    } = req.body;

    const updateData: Record<string, unknown> = {};

    if (date !== undefined) {
      if (!isValidDate(date)) {
        res.status(400).json({
          message: message.INVALID_DAILY_EXPENSE_DATA,
        });
        return;
      }
      updateData.date = new Date(date);
    }

    if (expenseType !== undefined) {
      if (typeof expenseType !== "string" || !expenseType.trim()) {
        res.status(400).json({
          message: message.INVALID_DAILY_EXPENSE_DATA,
        });
        return;
      }
      updateData.expenseType = expenseType.trim();
    }

    if (paymentType !== undefined) {
      if (!isValidPaymentType(paymentType)) {
        res.status(400).json({
          message: message.INVALID_DAILY_EXPENSE_DATA,
        });
        return;
      }
      updateData.paymentType = paymentType;
    }

    if (amount !== undefined) {
      if (
        amount === null ||
        amount === "" ||
        !Number.isFinite(Number(amount)) ||
        Number(amount) < 0
      ) {
        res.status(400).json({
          message: message.INVALID_DAILY_EXPENSE_DATA,
        });
        return;
      }
      updateData.amount = Number(amount);
    }

    if (description !== undefined) {
      if (
        description !== null &&
        typeof description !== "string"
      ) {
        res.status(400).json({
          message: message.INVALID_DAILY_EXPENSE_DATA,
        });
        return;
      }
      updateData.description = description;
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        message: message.DAILY_EXPENSE_UPDATE_DATA_REQUIRED,
      });
      return;
    }

    const expense = await dailyExpenseService.updateDailyExpense(
      id,
      updateData,
      req.userId,
    );

    res.status(200).json({
      message: message.DAILY_EXPENSE_UPDATED,
      data: expense,
    });
  } catch (error: any) {
    const notFound = error?.message === message.DAILY_EXPENSE_NOT_FOUND;

    res.status(notFound ? 404 : 500).json({
      message: error?.message || message.DAILY_EXPENSE_UPDATED_FAILED,
    });
  }
};

// Soft Delete Daily Expense
export const deleteDailyExpense = async (
  req: RequestWithAuthData,
  res: Response,
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: message.UNAUTHORIZED });
      return;
    }

    const id = req.params.id;

    if (typeof id !== "string" || !mongoose.isValidObjectId(id)) {
      res.status(400).json({
        message: message.INVALID_DAILY_EXPENSE_ID,
      });
      return;
    }

    const expense = await dailyExpenseService.deleteDailyExpense(
      id,
      req.userId,
    );

    res.status(200).json({
      message: message.DAILY_EXPENSE_DELETED,
      data: expense,
    });
  } catch (error: any) {
    const notFound = error?.message === message.DAILY_EXPENSE_NOT_FOUND;

    res.status(notFound ? 404 : 500).json({
      message: error?.message || message.DAILY_EXPENSE_DELETED_FAILED,
    });
  }
};
