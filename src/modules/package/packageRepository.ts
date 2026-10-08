import Package, {
  PackageDocument,
} from "../../models/packageModel.js";

export const create = async (
  packageData: Partial<PackageDocument>,
): Promise<PackageDocument> => {
  const packageDoc = new Package(packageData);

  return await packageDoc.save();
};

export const findById = async (
  id: string,
): Promise<PackageDocument | null> => {
  return Package.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate({
      path: "booking",
      populate: [
        {
          path: "sender",
          model: "Customer",
        },
        {
          path: "receiver",
          model: "Customer",
        },
        {
          path: "pickupOption",
          model: "PickupAssign",
        },
      ],
    })
    .populate("bundles.products.product")
    .populate("bundles.products.fabric")
    .exec();
};

export const findByBooking = async (
  bookingId: string,
): Promise<PackageDocument | null> => {
  return Package.findOne({
    booking: bookingId,
    isDeleted: false,
  })
    .populate({
      path: "booking",
      populate: [
        {
          path: "sender",
          model: "Customer",
        },
        {
          path: "receiver",
          model: "Customer",
        },
        {
          path: "pickupOption",
          model: "PickupAssign",
        },
      ],
    })
    .populate("bundles.products.product")
    .populate("bundles.products.fabric")
    .exec();
};

export const getAllPackages = async (): Promise<PackageDocument[]> => {
  return Package.find({
    isDeleted: false,
  })
    .populate({
      path: "booking",
      populate: [
        {
          path: "sender",
          model: "Customer",
        },
        {
          path: "receiver",
          model: "Customer",
        },
        {
          path: "pickupOption",
          model: "PickupAssign",
        },
      ],
    })
    .populate("bundles.products.product")
    .populate("bundles.products.fabric")
    .sort({ createdAt: -1 })
    .exec();
};
export const updateById = async (
  id: string,
  updateData: Partial<PackageDocument>,
): Promise<PackageDocument | null> => {
  return Package.findOneAndUpdate(
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
    .populate("bundles.products.product")
    .populate("bundles.products.fabric")
    .exec();
};

export const deletePackage = async (
  id: string,
): Promise<PackageDocument | null> => {
  return Package.findOneAndUpdate(
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
    .populate("booking")
    .populate("bundles.products.product")
    .populate("bundles.products.fabric")
    .exec();
};