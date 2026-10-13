
import mongoose from "mongoose";
import Stuffing, {
  StuffingDocument,
} from "../../models/stuffingModel.js";

const populateStuffing = (query: any) =>
  query
    .populate("container")
    .populate({
      path: "bookings",
      populate: [
        { path: "sender", model: "Customer" },
        { path: "receiver", model: "Customer" },
        { path: "pickupOption", model: "PickupAssign" },
      ],
    });

export const create = async (
  stuffingData: Partial<StuffingDocument>,
): Promise<StuffingDocument> => {
  const stuffing = new Stuffing(stuffingData);
  await stuffing.save();

  return (
    (await findById(stuffing._id.toString())) ?? stuffing
  );
};

export const getAllStuffings = async (
  containerId?: string,
): Promise<StuffingDocument[]> => {
  const filter: Record<string, unknown> = {
    isDeleted: false,
  };

  if (containerId) {
    filter.container = new mongoose.Types.ObjectId(containerId);
  }

  return populateStuffing(
    Stuffing.find(filter).sort({ createdAt: -1 }),
  ).exec();
};

export const findById = async (
  id: string,
): Promise<StuffingDocument | null> => {
  return populateStuffing(
    Stuffing.findOne({
      _id: id,
      isDeleted: false,
    }),
  ).exec();
};

