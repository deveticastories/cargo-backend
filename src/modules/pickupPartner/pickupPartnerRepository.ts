import PickupPartner, {
  PickupPartnerDocument,
} from "../../models/pickupPartnerModel";

export const create = async (
  pickupPartnerData: Partial<PickupPartnerDocument>,
): Promise<PickupPartnerDocument> => {
  const pickupPartner = new PickupPartner(pickupPartnerData);

  return await pickupPartner.save();
};

export const findById = async (
  id: string,
): Promise<PickupPartnerDocument | null> => {
  return PickupPartner.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<PickupPartnerDocument>,
): Promise<PickupPartnerDocument | null> => {
  return PickupPartner.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  ).exec();
};

export const getAllPickupPartners = async (): Promise<
  PickupPartnerDocument[]
> => {
  return PickupPartner.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deletePickupPartner = async (
  pickupPartnerId: string,
): Promise<PickupPartnerDocument | null> => {
  return PickupPartner.findByIdAndUpdate(
    pickupPartnerId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    {
      new: true,
    },
  ).exec();
};

export const changePickupPartnerStatus = async (
  id: string,
  updatedData: Partial<PickupPartnerDocument>,
): Promise<PickupPartnerDocument | null> => {
  return PickupPartner.findByIdAndUpdate(
    id,
    {
      $set: {
        status: updatedData.status,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  ).exec();
};

export const findByWhatsapp = async (
  whatsapp: string,
): Promise<PickupPartnerDocument | null> => {
  return PickupPartner.findOne({
    whatsapp: whatsapp.trim(),
    isDeleted: false,
  }).exec();
};