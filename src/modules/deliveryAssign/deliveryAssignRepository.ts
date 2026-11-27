
import DeliveryAssign, {
  DeliveryAssignDocument,
} from "../../models/deliveryAssignModel";

export const create = async (
  deliveryAssignData: Partial<DeliveryAssignDocument>,
): Promise<DeliveryAssignDocument> => {
  const deliveryAssign = new DeliveryAssign(deliveryAssignData);

  return await deliveryAssign.save();
};

export const findById = async (
  id: string,
): Promise<DeliveryAssignDocument | null> => {
  return DeliveryAssign.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("booking")
    .populate("deliveryPartner")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<DeliveryAssignDocument>,
): Promise<DeliveryAssignDocument | null> => {
  return DeliveryAssign.findOneAndUpdate(
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
    .populate("booking")
    .populate("deliveryPartner")
    .exec();
};

export const getAllDeliveryAssigns = async (): Promise<
  DeliveryAssignDocument[]
> => {
  return DeliveryAssign.find({ isDeleted: false })
    .populate("booking")
    .populate("deliveryPartner")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteDeliveryAssign = async (
  deliveryAssignId: string,
): Promise<DeliveryAssignDocument | null> => {
  return DeliveryAssign.findOneAndUpdate(
    {
      _id: deliveryAssignId,
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
    .populate("booking")
    .populate("deliveryPartner")
    .exec();
};

export const changeDeliveryAssignStatus = async (
  id: string,
  updatedData: Partial<DeliveryAssignDocument>,
): Promise<DeliveryAssignDocument | null> => {
  return DeliveryAssign.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        status: updatedData.status,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  )
    .populate("booking")
    .populate("deliveryPartner")
    .exec();
};
