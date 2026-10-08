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
    .exec();
};

export const getAllBookings = async (
  packingStatus?: "Ready to Ship" | "Repacking Required",
): Promise<BookingDocument[]> => {
  const filter: Record<string, any> = {
    isDeleted: false,
  };

  if (packingStatus) {
    filter.packingStatus = packingStatus;
  }

  return Booking.find(filter)
    .populate("sender")
    .populate("receiver")
    .populate("pickupOption")
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
    .exec();
};

export const getLastBooking = async (): Promise<BookingDocument | null> => {
  return Booking.findOne({
    isDeleted: false,
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
    .exec();
};

export const changeStuffStatus = async (
  id: string,
  stuffStatus: "Pending" | "Stuffed",
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
    .exec();
};