import mongoose from "mongoose";
import { ContainerDocument } from "../../models/containerModel";
import * as containerRepository from "./containerRepository";

export const createContainer = async (
  containerData: Partial<ContainerDocument>,
): Promise<ContainerDocument> => {
  try {
    const lastContainer =
      await containerRepository.getLastContainer();

    let nextNumber = 1;

    if (lastContainer?.containerCode) {
      const lastNumber = parseInt(
        lastContainer.containerCode.replace("CNT-", ""),
        10,
      );

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const containerCode = `CNT-${String(nextNumber).padStart(4, "0")}`;

    return await containerRepository.create({
      ...containerData,
      containerCode,
    });
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to create container",
    );
  }
};

export const getAllContainers = async () => {
  try {
    const containers =
      await containerRepository.getAllContainers();

    return {
      totalContainers: containers.length,
      containerList: containers,
    };
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get containers",
    );
  }
};

export const getContainerById = async (
  id: string,
): Promise<ContainerDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid container ID");
    }

    const container =
      await containerRepository.findById(id);

    if (!container) {
      throw new Error("Container not found");
    }

    return container;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to get container",
    );
  }
};

export const updateContainer = async (
  id: string,
  containerData: Partial<ContainerDocument>,
): Promise<ContainerDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid container ID");
    }

    const container =
      await containerRepository.updateById(
        id,
        containerData,
      );

    if (!container) {
      throw new Error("Container not found");
    }

    return container;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update container",
    );
  }
};

export const deleteContainer = async (
  id: string,
): Promise<ContainerDocument | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid container ID");
    }

    const container =
      await containerRepository.deleteContainer(id);

    if (!container) {
      throw new Error("Container not found");
    }

    return container;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to delete container",
    );
  }
};

export const updateContainerStatus = async (
  id: string,
  containerStatus: "Active" | "Inactive" | "Stuffed",
  updatedBy?: string,
): Promise<ContainerDocument> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid container ID");
    }

    const container =
      await containerRepository.changeContainerStatus(
        id,
        containerStatus,
        updatedBy,
      );

    if (!container) {
      throw new Error("Container not found");
    }

    return container;
  } catch (error: any) {
    throw new Error(
      error?.message || "Failed to update container status",
    );
  }
};