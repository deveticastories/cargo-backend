import PreBooking, {
    PreBookingDocument,
} from "../../models/prebookingModel";

export const create = async (
    preBookingData: Partial<PreBookingDocument>,
): Promise<PreBookingDocument> => {
    const preBooking = new PreBooking(preBookingData);

    return await preBooking.save();
};
export const getLastPreBooking = async (): Promise<PreBookingDocument | null> => {
    // Include soft-deleted records: they still hold their preBookingId in the
    // unique index, so skipping them would reissue a taken ID (E11000).
    return PreBooking.findOne({
        preBookingId: /^PBK-\d+$/,
    })
        .sort({ createdAt: -1 })
        .exec();
};
export const findById = async (
    id: string,
): Promise<PreBookingDocument | null> => {
    return PreBooking.findOne({
        _id: id,
        isDeleted: false,
    })
        .populate("sender")
        .exec();
};

export const updateById = async (
    id: string,
    updateData: Partial<PreBookingDocument>,
): Promise<PreBookingDocument | null> => {
    return PreBooking.findOneAndUpdate(
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
        .exec();
};

export const getAllPreBookings = async (): Promise<
    PreBookingDocument[]
> => {
    return PreBooking.find({
        isDeleted: false,
    })
        .populate("sender")
        .sort({ createdAt: -1 })
        .exec();
};

export const deletePreBooking = async (
    id: string,
): Promise<PreBookingDocument | null> => {
    return PreBooking.findOneAndUpdate(
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
        .exec();
}; export const changePreBookingStatus = async (
  id: string,
  preBookingStatus: "Pending" | "Collected" | "Canceled",
  updatedBy?: string,
): Promise<PreBookingDocument | null> => {
  return PreBooking.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        preBookingStatus,
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
    .exec();
};