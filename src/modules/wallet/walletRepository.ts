import mongoose from "mongoose";
import WalletModel from "../../models/walletModel";

export const findWalletByUserId = async (
    userId: string,
    session?: mongoose.ClientSession,
) => {
    return WalletModel.findOne({
        userId,
    }).session(session ?? null);
};

export const createWallet = async (
    userId: string,
    session?: mongoose.ClientSession,
) => {
    const [wallet] = await WalletModel.create(
        [{
            userId,
            balance: 0,
        }],
        { session },
    );

    return wallet;
};

export const findOrCreateWallet = async (
    userId: string,
    session?: mongoose.ClientSession,
) => {
    const wallet = await findWalletByUserId(
        userId,
        session,
    );

    if (wallet) {
        return wallet;
    }

    return createWallet(userId, session);
};

export const addWalletBalance = async (
    userId: string,
    amount: number,
    session: mongoose.ClientSession,
) => {
    return WalletModel.findOneAndUpdate(
        { userId },
        {
            $inc: { balance: amount },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            session,
        },
    );
};
export const deductWalletBalance = async (
    userId: string,
    amount: number,
    session: mongoose.ClientSession,
) => {
    return WalletModel.findOneAndUpdate(
        { userId },
        {
            $inc: {
                balance: -amount,
            },
        },
        {
            new: true,
            session,
        },
    );
};