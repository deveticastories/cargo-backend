import mongoose from "mongoose";
import * as walletRepository from "./walletRepository";
import * as walletTransactionRepository from "../../utils/walletTransaction";

export const addWalletMoney = async (
    userId: string,
    amount: number,
    description: string,
) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid wallet amount");
    }

    const session = await mongoose.startSession();

    try {
        let result: any;

        await session.withTransaction(async () => {
            await walletRepository.findOrCreateWallet(
                userId,
                session,
            );

            const wallet =
                await walletRepository.addWalletBalance(
                    userId,
                    amount,
                    session,
                );

            if (!wallet) {
                throw new Error("Unable to update wallet balance");
            }

            const transaction =
                await walletTransactionRepository.createWalletTransaction(
                    {
                        userId,
                        amount,
                        type: "Credit",
                        description,
                    },
                    session,
                );

            result = {
                wallet,
                transaction,
            };
        });

        return result;
    } finally {
        await session.endSession();
    }
};

export const deductWalletMoney = async (
    userId: string,
    amount: number,
    pickupAssignId: string,
    session?: mongoose.ClientSession,
) => {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Invalid payment amount");
    }

    if (
        !mongoose.Types.ObjectId.isValid(userId) ||
        !mongoose.Types.ObjectId.isValid(pickupAssignId)
    ) {
        throw new Error("Invalid user ID or pickup assign ID");
    }

    const executeDeduction = async (
        activeSession: mongoose.ClientSession,
    ) => {
        console.log("Wallet user ID:", userId);
        console.log("Deduction amount:", amount);

        // Check duplicate transaction
        const existingTransaction =
            await walletTransactionRepository.findWalletTransactionByReference(
                pickupAssignId,
                "Debit",
                activeSession,
            );

        if (existingTransaction) {
            throw new Error(
                "Wallet payment already deducted for this booking",
            );
        }

        // Find wallet or create a new one
        let wallet =
            await walletRepository.findOrCreateWallet(
                userId,
                activeSession,
            );

        console.log("Wallet before deduction:", wallet.balance);

        // Deduct amount even if balance becomes negative
        const updatedWallet =
            await walletRepository.deductWalletBalance(
                userId,
                amount,
                activeSession,
            );

        if (!updatedWallet) {
            throw new Error("Wallet deduction failed");
        }

        wallet = updatedWallet;

        console.log("Wallet after deduction:", wallet.balance);

        // Create debit transaction
        const transaction =
            await walletTransactionRepository.createWalletTransaction(
                {
                    userId,
                    amount,
                    type: "Debit",
                    description: `Payment for pickup booking ${pickupAssignId}`,
                    referenceId: pickupAssignId,
                },
                activeSession,
            );

        console.log("Wallet transaction created:", transaction);

        return {
            wallet,
            transaction,
        };
    };

    if (session) {
        return executeDeduction(session);
    }

    const newSession = await mongoose.startSession();

    try {
        let result: any;

        await newSession.withTransaction(async () => {
            result = await executeDeduction(newSession);
        });

        return result;
    } finally {
        await newSession.endSession();
    }
};
export const getWalletBalance = async (
    userId: string,
) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    const wallet = await walletRepository.findWalletByUserId(
        userId,
    );

    return {
        balance: wallet?.balance ?? 0,
    };
};

export const getWalletTransactionHistory = async (
    userId: string,
    page = 1,
    limit = 10,
) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }

    return walletTransactionRepository.findWalletTransactions(
        userId,
        page,
        limit,
    );
};