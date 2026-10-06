import DeliveryPartner, {
  DeliveryPartnerDocument,
} from "../../models/deliveryPartnerModel";

export const create = async (
  deliveryPartnerData: Partial<DeliveryPartnerDocument>,
): Promise<DeliveryPartnerDocument> => {
  const deliveryPartner = new DeliveryPartner(deliveryPartnerData);

  return await deliveryPartner.save();
};

export const findById = async (
  id: string,
): Promise<DeliveryPartnerDocument | null> => {
  return DeliveryPartner.findById(id)
    .where({ isDeleted: false })
    .populate("from")
    .populate("toCountry")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<DeliveryPartnerDocument>,
): Promise<DeliveryPartnerDocument | null> => {
  return DeliveryPartner.findByIdAndUpdate(
    id,
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("from")
    .populate("toCountry")
    .exec();
};

export const getAllDeliveryPartners = async (): Promise<
  DeliveryPartnerDocument[]
> => {
  return DeliveryPartner.find({ isDeleted: false })
    .populate("from")
    .populate("toCountry")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteDeliveryPartner = async (
  deliveryPartnerId: string,
): Promise<DeliveryPartnerDocument | null> => {
  return DeliveryPartner.findByIdAndUpdate(
    deliveryPartnerId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    {
      new: true,
    },
  )
    .populate("from")
    .populate("toCountry")
    .exec();
};

export const changeDeliveryPartnerStatus = async (
  id: string,
  updatedData: Partial<DeliveryPartnerDocument>,
): Promise<DeliveryPartnerDocument | null> => {
  return DeliveryPartner.findByIdAndUpdate(
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
  )
    .populate("from")
    .populate("toCountry")
    .exec();
};

export const findByWhatsapp = async (
  whatsapp: string,
): Promise<DeliveryPartnerDocument | null> => {
  return DeliveryPartner.findOne({
    whatsapp: whatsapp.trim(),
    isDeleted: false,
  })
    .populate("from")
    .populate("toCountry")
    .exec();
};