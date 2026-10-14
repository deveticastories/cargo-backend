
import { Response } from "express";
import * as reportsService from "./reportsService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const getBookingReportsController = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        const month =
            req.query.month !== undefined ? Number(req.query.month) : undefined;

        const year =
            req.query.year !== undefined ? Number(req.query.year) : undefined;

        const packingStatus = req.query.packingStatus;
        const packageListStatus = req.query.packageListStatus;

        if (
            (month !== undefined &&
                (!Number.isInteger(month) || month < 1 || month > 12)) ||
            (year !== undefined &&
                (!Number.isInteger(year) || year < 2000 || year > 9999)) ||
            (month !== undefined && year === undefined)
        ) {
            return res.status(400).json({
                success: false,
                message: message.INVALID_MONTH_YEAR,
            });
        }

        if (
            packingStatus !== undefined &&
            (typeof packingStatus !== "string" ||
                !["Ready to Ship", "Repacking Required"].includes(packingStatus))
        ) {
            return res.status(400).json({
                success: false,
                message: message.INVALID_PACKING_STATUS,
            });
        }

        if (
            packageListStatus !== undefined &&
            (typeof packageListStatus !== "string" ||
                !["Added", "Pending"].includes(packageListStatus))
        ) {
            return res.status(400).json({
                success: false,
                message: message.INVALID_PACKAGE_LIST_STATUS,
            });
        }

        const reports = await reportsService.getBookingReportService({
            month,
            year,
            packingStatus: packingStatus as
                | "Ready to Ship"
                | "Repacking Required"
                | undefined,
            packageListStatus: packageListStatus as
                | "Added"
                | "Pending"
                | undefined,
        });

        return res.status(200).json({
            success: true,
            message: message.BOOKING_REPORT_FETCHED,
            count: reports.length,
            data: reports,
        });
    } catch (error: unknown) {
        console.error("Get reports error:", error);

        return res.status(500).json({
            success: false,
            message: message.BOOKING_REPORT_FETCH_FAILED,
        });
    }
};

export const getContainerStuffingReport = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        const report =
            await reportsService.getContainerStuffingReportService();

        return res.status(200).json({
            success: true,
            message: message.CONTAINER_STUFFING_REPORT_FETCHED,
            totalContainers: report.totalContainers,
            totalStuffedBookings: report.totalStuffedBookings,
            data: report.data,
        });
    } catch (error: unknown) {
        console.error("Get container stuffing report error:", error);

        return res.status(500).json({
            success: false,
            message: message.CONTAINER_STUFFING_REPORT_FETCH_FAILED,
        });
    }
};

export const getCountryWiseStuffedReport = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        const report =
            await reportsService.getCountryWiseStuffedReportService();

        return res.status(200).json({
            success: true,
            message: "Country-wise stuffed booking report fetched successfully",
            totalStuffedBookings: report.totalStuffedBookings,
            data: report.data,
        });
    } catch (error: unknown) {
        console.error("Country-wise stuffed report error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch country-wise stuffed booking report",
        });
    }
};

export const getCustomerWiseStuffedReport = async (
    req: RequestWithAuthData,
    res: Response,
) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: message.UNAUTHORIZED,
            });
        }

        const report =
            await reportsService.getCustomerWiseStuffedReportService();

        return res.status(200).json({
            success: true,
            message: "Customer-wise stuffed booking report fetched successfully",
            totalCustomers: report.totalCustomers,
            totalStuffedBookings: report.totalStuffedBookings,
            data: report.data,
        });
    } catch (error: unknown) {
        console.error("Customer-wise stuffed report error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch customer-wise stuffed booking report",
        });
    }
};