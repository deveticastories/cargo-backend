import Unit, {
  UnitDocument,
} from "../../models/unitModel";

export const create = async (
  unitData: Partial<UnitDocument>,
): Promise<UnitDocument> => {
  const unit = new Unit(unitData);

  return await unit.save();
};

export const findById = async (
  id: string,
): Promise<UnitDocument | null> => {
  return Unit.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<UnitDocument>,
): Promise<UnitDocument | null> => {
  return Unit.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).exec();
};

export const getAllUnits = async (): Promise<UnitDocument[]> => {
  return Unit.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteUnit = async (
  unitId: string,
): Promise<UnitDocument | null> => {
  return Unit.findByIdAndUpdate(
    unitId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true },
  ).exec();
};

export const changeUnitStatus = async (
  id: string,
  updatedData: Partial<UnitDocument>,
): Promise<UnitDocument | null> => {
  return Unit.findByIdAndUpdate(
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
): Promise<UnitDocument | null> => {
  return Unit.findOne({
    name: name.trim(),
    isDeleted: false,
  }).exec();
};