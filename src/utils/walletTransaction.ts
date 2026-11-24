import mongoose from "mongoose";
import WalletTransactionModel from "../models/walletTransactionModel";

interface CreateWalletTransactionInput {
    userId: string;
    amount: number;
    type: "Credit" | "Debit";
    description: string;
    referenceId?: string;
}

export const createWalletTransaction = async (
    data: CreateWalletTransactionInput,
    session: mongoose.ClientSession,
) => {
    const [transaction] =
        await WalletTransactionModel.create(
            [{
                userId: data.userId,
                amount: data.amount,
                type: data.type,
                description: data.description,
                referenceId: data.referenceId,
            }],
            { session },
        );

    return transaction;
};

export const findWalletTransactionByReference = async (
    referenceId: string,
    type: "Credit" | "Debit",
    session?: mongoose.ClientSession,
) => {
    return WalletTransactionModel.findOne({
        referenceId,
        type,
    }).session(session ?? null);
};

export const findWalletTransactions = async (
    userId: string,
    page: number,
    limit: number,
) => {
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
        WalletTransactionModel.find({
            userId,
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        WalletTransactionModel.countDocuments({
            userId,
        }),
    ]);

    return {
        transactions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};

export const findWalletTransactionById = async (
    id: string,
) => {
    return WalletTransactionModel.findById(id);
};