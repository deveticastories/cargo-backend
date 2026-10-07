import Pricing, {
  PricingDocument,
} from "../../models/priceModel";

export const create = async (
  pricingData: Partial<PricingDocument>,
): Promise<PricingDocument> => {
  const pricing = new Pricing(pricingData);

  return await pricing.save();
};

export const findById = async (
  id: string,
): Promise<PricingDocument | null> => {
  return Pricing.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<PricingDocument>,
): Promise<PricingDocument | null> => {
  return Pricing.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).exec();
};

export const getAllPricings = async (): Promise<PricingDocument[]> => {
  return Pricing.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deletePricing = async (
  pricingId: string,
): Promise<PricingDocument | null> => {
  return Pricing.findByIdAndUpdate(
    pricingId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true },
  ).exec();
};

export const findByRoute = async (
  from: string,
  to: string,
  uom: PricingDocument["uom"],
): Promise<PricingDocument | null> => {
  return Pricing.findOne({
    from: from.trim(),
    to: to.trim(),
    uom,
    isDeleted: false,
  }).exec();
};