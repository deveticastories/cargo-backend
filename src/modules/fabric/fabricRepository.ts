import Fabric, {
  FabricDocument,
} from "../../models/fabricModel";

export const create = async (
  fabricData: Partial<FabricDocument>,
): Promise<FabricDocument> => {
  const fabric = new Fabric(fabricData);

  return await fabric.save();
};

export const findById = async (
  id: string,
): Promise<FabricDocument | null> => {
  return Fabric.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<FabricDocument>,
): Promise<FabricDocument | null> => {
  return Fabric.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).exec();
};

export const getAllFabrics = async (): Promise<FabricDocument[]> => {
  return Fabric.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteFabric = async (
  fabricId: string,
): Promise<FabricDocument | null> => {
  return Fabric.findByIdAndUpdate(
    fabricId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true },
  ).exec();
};

export const changeFabricStatus = async (
  id: string,
  updatedData: Partial<FabricDocument>,
): Promise<FabricDocument | null> => {
  return Fabric.findByIdAndUpdate(
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

export const findByName = async (
  name: string,
): Promise<FabricDocument | null> => {
  return Fabric.findOne({
    name: name.trim(),
    isDeleted: false,
  }).exec();
};