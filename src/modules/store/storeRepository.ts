import Store, {
  StoreDocument,
} from "../../models/storeModel";

export const create = async (
  storeData: Partial<StoreDocument>,
): Promise<StoreDocument> => {
  const store = new Store(storeData);

  return await store.save();
};

export const findById = async (
  id: string,
): Promise<StoreDocument | null> => {
  return Store.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<StoreDocument>,
): Promise<StoreDocument | null> => {
  return Store.findByIdAndUpdate(
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

export const getAllStores = async (): Promise<StoreDocument[]> => {
  return Store.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteStore = async (
  storeId: string,
): Promise<StoreDocument | null> => {
  return Store.findByIdAndUpdate(
    storeId,
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

export const changeStoreStatus = async (
  id: string,
  updatedData: Partial<StoreDocument>,
): Promise<StoreDocument | null> => {
  return Store.findByIdAndUpdate(
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