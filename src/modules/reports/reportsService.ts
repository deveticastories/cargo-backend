
import {
    getBookingReport,
    BookingReportFilters, getContainerStuffingReport, getStuffedBookingsForReports

} from "./reportsRepository";

export const getBookingReportService = async (
    filters: BookingReportFilters,
) => {
    return getBookingReport(filters);
};

export const getContainerStuffingReportService = async () => {
    const stuffingRecords = await getContainerStuffingReport();

    const containerMap = new Map<string, any>();

    for (const record of stuffingRecords) {
        const container = record.container as any;

        if (!container?._id) {
            continue;
        }

        const containerId = container._id.toString();

        if (!containerMap.has(containerId)) {
            containerMap.set(containerId, {
                container,
                stuffingDates: [],
                bookingsMap: new Map<string, any>(),
            });
        }

        const containerReport = containerMap.get(containerId);
        const stuffingDate = new Date(record.date).toISOString();

        if (!containerReport.stuffingDates.includes(stuffingDate)) {
            containerReport.stuffingDates.push(stuffingDate);
        }

        for (const booking of record.bookings as any[]) {
            if (!booking?._id) {
                continue;
            }

            const bookingId = booking._id.toString();

            if (!containerReport.bookingsMap.has(bookingId)) {
                containerReport.bookingsMap.set(bookingId, booking);
            }
        }
    }

    const data = Array.from(containerMap.values()).map((item) => {
        const bookings = Array.from(item.bookingsMap.values());

        const totalStuffedBookings = bookings.filter(
            (booking: any) => booking.stuffStatus === "Stuffed",
        ).length;

        return {
            container: item.container,
            stuffingDates: item.stuffingDates,
            totalBookings: bookings.length,
            totalStuffedBookings,
            bookings,
        };
    });

    return {
        totalContainers: data.length,
        totalStuffedBookings: data.reduce(
            (total, item) => total + item.totalStuffedBookings,
            0,
        ),
        data,
    };
};


export const getCountryWiseStuffedReportService = async () => {
    const bookings = await getStuffedBookingsForReports();

    const countryMap = new Map<string, number>();

    for (const booking of bookings) {
        const receiver = booking.receiver as any;

        if (!receiver?._id || !receiver.country) {
            continue;
        }

        const country = receiver.country.trim();

        if (!country) {
            continue;
        }

        countryMap.set(
            country,
            (countryMap.get(country) || 0) + 1,
        );
    }

    const data = Array.from(countryMap.entries())
        .map(([country, totalStuffedBookings]) => ({
            country,
            totalStuffedBookings,
        }))
        .sort((a, b) => a.country.localeCompare(b.country));

    return {
        totalStuffedBookings: data.reduce(
            (total, item) => total + item.totalStuffedBookings,
            0,
        ),
        data,
    };
};

export const getCustomerWiseStuffedReportService = async () => {
  const bookings = await getStuffedBookingsForReports();

  const customerMap = new Map<
    string,
    {
      customerName: string;
      whatsapp: string;
      bookingNumbers: string[];
    }
  >();

  for (const booking of bookings) {
    const receiver = booking.receiver as any;

    if (!receiver?._id || !receiver.whatsapp) {
      continue;
    }

    const whatsapp = receiver.whatsapp.trim();

    if (!whatsapp) {
      continue;
    }

    const customerId = receiver._id.toString();

    if (!customerMap.has(customerId)) {
      customerMap.set(customerId, {
        customerName: receiver.name || "",
        whatsapp,
        bookingNumbers: [],
      });
    }

    customerMap.get(customerId)!.bookingNumbers.push(
      booking.bookingId,
    );
  }

  const data = Array.from(customerMap.values())
    .map((item) => ({
      customerName: item.customerName,
      whatsapp: item.whatsapp,
      totalStuffedBookings: item.bookingNumbers.length,
      bookingNumbers: item.bookingNumbers,
    }))
    .sort((a, b) => a.whatsapp.localeCompare(b.whatsapp));

  return {
    totalCustomers: data.length,
    totalStuffedBookings: data.reduce(
      (total, item) => total + item.totalStuffedBookings,
      0,
    ),
    data,
  };
};


