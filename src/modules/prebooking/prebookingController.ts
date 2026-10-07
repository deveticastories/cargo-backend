import { Request, Response } from "express";

import * as preBookingService from "./prebookingService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createPreBooking = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    try {
        const preBookingData = {
            ...req.body,
            createdBy: req.userId,
        };

        const preBooking =
            await preBookingService.createPreBooking(
                preBookingData,
            );

        return res.status(201).json({
            success: true,
            message: message.PRE_BOOKING_CREATED,
            preBooking,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
};

export const getAllPreBookings = async (
    req: Request,
    res: Response,
) => {
    try {
        const result =
            await preBookingService.getAllPreBookings();

        return res.status(200).json({
            success: true,
            totalPreBookings: result.totalPreBookings,
            preBookingList: result.preBookingList,
            totalCollectedBookings:
                result.totalCollectedBookings,
            bundle: result.bundle,
            box: result.box,
            cbm: result.cbm,
            kg: result.kg,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
};
export const getPreBookingById = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PRE_BOOKING_ID,
        });
    }

    try {
        const preBooking =
            await preBookingService.getPreBookingById(id);

        if (!preBooking) {
            return res.status(404).json({
                success: false,
                message: message.PRE_BOOKING_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            preBooking,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
};

export const editPreBooking = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PRE_BOOKING_ID,
        });
    }

    try {
        const preBookingData = {
            ...req.body,
            updatedBy: req.userId,
        };

        const updatedPreBooking =
            await preBookingService.editPreBooking(
                id,
                preBookingData,
            );

        if (!updatedPreBooking) {
            return res.status(404).json({
                success: false,
                message: message.PRE_BOOKING_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: message.PRE_BOOKING_UPDATED,
            preBooking: updatedPreBooking,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
};

export const deletePreBooking = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PRE_BOOKING_ID,
        });
    }

    try {
        const deletedPreBooking =
            await preBookingService.deletePreBooking(id);

        if (!deletedPreBooking) {
            return res.status(404).json({
                success: false,
                message: message.PRE_BOOKING_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message: message.PRE_BOOKING_DELETED,
            preBooking: deletedPreBooking,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
};

export const updatePreBookingStatus = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: message.UNAUTHORIZED,
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            success: false,
            message: message.INVALID_PRE_BOOKING_ID,
        });
    }

    const allowedStatuses = [
        "Pending",
        "Collected",
        "Canceled",
    ];

    if (
        !allowedStatuses.includes(
            req.body.preBookingStatus,
        )
    ) {
        return res.status(400).json({
            success: false,
            message:
                "preBookingStatus must be Pending, Collected, or Canceled",
        });
    }

    try {
        const updatedPreBooking =
            await preBookingService.updatePreBookingStatus(
                id,
                req.body.preBookingStatus,
                req.userId.toString(),
            );

        if (!updatedPreBooking) {
            return res.status(404).json({
                success: false,
                message: message.PRE_BOOKING_NOT_FOUND,
            });
        }

        return res.status(200).json({
            success: true,
            message:
                message.PRE_BOOKING_STATUS_UPDATED,
            preBooking: updatedPreBooking,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error?.message,
        });
    }
};