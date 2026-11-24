import { Request, Response } from "express";
import mongoose from "mongoose";
import * as walletService from "./walletService";
import { RequestWithAuthData } from "../../@types/express";

export const addWalletMoney = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { userId, amount, description } = req.body;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    if (
        !userId ||
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid pickup partner ID",
        });
    }

    if (
        typeof amount !== "number" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid wallet amount",
        });
    }

    try {
        const result = await walletService.addWalletMoney(
            userId,
            amount,
            description || "Wallet balance added",
        );

        return res.status(200).json({
            success: true,
            message: "Wallet balance added successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getWalletBalance = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    try {
        const result = await walletService.getWalletBalance(
            req.userId.toString(),
        );

        return res.status(200).json({
            success: true,
            message: "Wallet balance fetched successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getWalletTransactionHistory = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const page = Math.max(
        1,
        Number(req.query.page) || 1,
    );

    const limit = Math.min(
        100,
        Math.max(1, Number(req.query.limit) || 10),
    );

    try {
        const result =
            await walletService.getWalletTransactionHistory(
                req.userId.toString(),
                page,
                limit,
            );

        return res.status(200).json({
            success: true,
            message: "Wallet transaction history fetched successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};