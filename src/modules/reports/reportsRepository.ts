

import Booking, {
    BookingDocument,
} from "../../models/bookingModel";
import Stuffing from "../../models/stuffingModel";

export interface BookingReportFilters {
    month?: number;
    year?: number;
    packingStatus?: "Ready to Ship" | "Repacking Required";
    packageListStatus?: "Added" | "Pending";
}

export const getBookingReport = async (
    filters: BookingReportFilters,
): Promise<BookingDocument[]> => {
    const {
        month,
        year,
        packingStatus,
        packageListStatus,
    } = filters;

    const filter: Record<string, any> = {
        isDeleted: false,
    };

    if (month !== undefined && year !== undefined) {
        filter.createdAt = {
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
        };
    } else if (year !== undefined) {
        filter.createdAt = {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
        };
    }

    if (packingStatus) {
        filter.packingStatus = packingStatus;
    }

    if (packageListStatus) {
        filter.packageListStatus = packageListStatus;
    }

    return Booking.find(filter)
        .populate("sender")
        .populate("receiver")
        .populate("pickupOption")
        .sort({ createdAt: -1 })
        .exec();
};

export const getContainerStuffingReport = async () => {
    return Stuffing.find({ isDeleted: false })
        .populate({
            path: "container",
            match: { isDeleted: false },
        })
        .populate({
            path: "bookings",
            match: { isDeleted: false },
        })
        .sort({ date: -1 })
        .exec();
};
export const getStuffedBookingsForReports = async () => {
    return Booking.find({
        stuffStatus: "Stuffed",
        isDeleted: false,
    })
        .populate({
            path: "receiver",
            select: "name country whatsapp isDeleted",
            match: { isDeleted: false },
        })
        .select("bookingId receiver stuffStatus")
        .exec();
};