import PickupAssign, {
  PickupAssignDocument,
} from "../../models/pickupAssignModel";

export const create = async (
  pickupAssignData: Partial<PickupAssignDocument>,
): Promise<PickupAssignDocument> => {
  const pickupAssign = new PickupAssign(pickupAssignData);

  return await pickupAssign.save();
};

export const findById = async (
  id: string,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("transport")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<PickupAssignDocument>,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOneAndUpdate(
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
    .populate("transport")
    .exec();
};

export const getAllPickupAssigns = async (): Promise<
  PickupAssignDocument[]
> => {
  return PickupAssign.find({
    isDeleted: false,
  })
    .populate("transport")
    .sort({ createdAt: -1 })
    .exec();
};

export const deletePickupAssign = async (
  pickupAssignId: string,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOneAndUpdate(
    {
      _id: pickupAssignId,
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
      runValidators: true,
    },
  )
    .populate("transport")
    .exec();
};

export const changePickupAssignStatus = async (
  id: string,
  status: boolean,
  updatedBy?: string,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOneAndUpdate(
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
    .populate("transport")
    .exec();
};

export const findByLrNo = async (
  lrNo: string,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOne({
    lrNo: lrNo.trim(),
    isDeleted: false,
  })
    .populate("transport")
    .exec();
};

export const changePaymentStatus = async (
  id: string,
  paymentStatus: "Unpaid" | "Paid",
  updatedBy?: string,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        paymentStatus,
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("transport")
    .exec();
};

export const markCollected = async (
  id: string,
  collectedBundle: number,
  updatedBy?: string,
): Promise<PickupAssignDocument | null> => {
  return PickupAssign.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        pickupStatus: "Collected",
        collectedBundle,
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("transport")
    .exec();
};