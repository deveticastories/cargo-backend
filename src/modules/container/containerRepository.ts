import Container, {
  ContainerDocument,
} from "../../models/containerModel";

export const create = async (
  containerData: Partial<ContainerDocument>,
): Promise<ContainerDocument> => {
  const container = new Container(containerData);
  return await container.save();
};

export const findById = async (
  id: string,
): Promise<ContainerDocument | null> => {
  return Container.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
};

export const getAllContainers = async (): Promise<ContainerDocument[]> => {
  return Container.find({
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<ContainerDocument>,
): Promise<ContainerDocument | null> => {
  return Container.findOneAndUpdate(
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
  ).exec();
};

export const deleteContainer = async (
  id: string,
): Promise<ContainerDocument | null> => {
  return Container.findOneAndUpdate(
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
  ).exec();
};

export const changeContainerStatus = async (
  id: string,
  containerStatus: "Active" | "Inactive" | "Stuffed",
  updatedBy?: string,
): Promise<ContainerDocument | null> => {
  return Container.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        containerStatus,
        updatedBy,
        updatedAt: new Date(),
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  ).exec();
};
export const getLastContainer = async (): Promise<ContainerDocument | null> => {
  return Container.findOne({
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .exec();
};