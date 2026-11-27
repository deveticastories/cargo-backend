import Booking, {
  BookingDocument,
} from "../../models/bookingModel";

export const create = async (
  bookingData: Partial<BookingDocument>,
): Promise<BookingDocument> => {
  const booking = new Booking(bookingData);

  return await booking.save();
};

export const findById = async (
  id: string,
): Promise<BookingDocument | null> => {
  return Booking.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<BookingDocument>,
): Promise<BookingDocument | null> => {
  return Booking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: updateData,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};

export const getAllBookings = async (
  packingStatus?: "Ready to Ship" | "Repacking Required",
  packageListStatus?: "Added" | "Pending",
): Promise<BookingDocument[]> => {
  const filter: Record<string, any> = {
    isDeleted: false,
  };

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
    .populate("pickupPartner")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteBooking = async (
  id: string,
): Promise<BookingDocument | null> => {
  return Booking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
    },
  )
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};

export const changeBookingStatus = async (
  id: string,
  status: boolean,
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  return Booking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        status,
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};

export const findByBookingId = async (
  bookingId: string,
): Promise<BookingDocument | null> => {
  return Booking.findOne({
    bookingId: bookingId.trim(),
    isDeleted: false,
  })
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};

export const getLastBooking = async (): Promise<BookingDocument | null> => {
  // Include soft-deleted records: they still hold their bookingId in the
  // unique index, so skipping them would reissue a taken ID (E11000).
  return Booking.findOne({
    bookingId: /^BKG-\d+$/,
  })
    .sort({ createdAt: -1 })
    .exec();
};
export const changePackageListStatus = async (
  id: string,
  packageListStatus: "Added" | "Pending",
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  return Booking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        packageListStatus,
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};

export const changeStuffStatus = async (
  id: string,
  stuffStatus: "Pending" | "Stuffed" | "Ready to Stuff",
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  return Booking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        stuffStatus,
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};
export const changePackingStatus = async (
  id: string,
  packingStatus:
    | "Ready to Ship"
    | "Repacking Required",
  updatedBy?: string,
): Promise<BookingDocument | null> => {
  const bundle =
    packingStatus === "Ready to Ship"
      ? undefined
      : null;

  return Booking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        packingStatus,
        ...(packingStatus === "Repacking Required"
          ? { bundle: null }
          : {}),
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
    .populate("pickupPartner")
    .exec();
};


import BookingModel from "../../models/bookingModel";

export const findAllBookingsOutsideUAE = () => {
  return BookingModel.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "stuffings",
        localField: "_id",
        foreignField: "bookings",
        as: "stuffingDetails",
      },
    },
    {
      $unwind: "$stuffingDetails",
    },
    {
      $lookup: {
        from: "containers",
        localField: "stuffingDetails.container",
        foreignField: "_id",
        as: "containerDetails",
      },
    },
    {
      $unwind: "$containerDetails",
    },
    {
      $match: {
        "containerDetails.containerStatus": "Stuffed",
        "containerDetails.isDeleted": false,
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "receiver",
        foreignField: "_id",
        as: "receiverDetails",
      },
    },
    {
      $unwind: "$receiverDetails",
    },
    {
      $match: {
        "receiverDetails.isDeleted": false,
      },
    },
    {
      $lookup: {
        from: "countries",
        localField: "receiverDetails.country",
        foreignField: "_id",
        as: "receiverCountry",
      },
    },
    {
      $unwind: "$receiverCountry",
    },
    {
      $match: {
        "receiverCountry.name": {
          $not: /^UAE$/i,
        },
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "sender",
        foreignField: "_id",
        as: "senderDetails",
      },
    },
    {
      $unwind: {
        path: "$senderDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        booking: {
          $first: "$$ROOT",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$booking",
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ]);
};
