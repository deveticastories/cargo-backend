import logger from "../../utils/logger";

import * as storeRepository from "./storeRepository";
import { StoreDocument } from "../../models/storeModel";

export const createStore = async (
  storeData: Partial<StoreDocument>,
): Promise<StoreDocument> => {
  try {
    logger.info("Creating a new store", { storeData });


    const newStore =
      await storeRepository.create(storeData);

    logger.info("Store created successfully", {
      storeId: newStore._id,
      location: newStore.location,
    });

    return newStore;
  } catch (error: any) {
    logger.error("Error creating store", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editStore = async (
  storeId: string,
  storeData: Partial<StoreDocument>,
): Promise<StoreDocument | null> => {
  try {
    logger.info(`Editing store with ID ${storeId}`, {
      storeData,
    });

   

    const updatedStore =
      await storeRepository.updateById(
        storeId,
        storeData,
      );

    if (!updatedStore) {
      throw new Error(
        `Store with ID ${storeId} not found`,
      );
    }

    logger.info("Store updated successfully", {
      storeId: updatedStore._id,
    });

    return updatedStore;
  } catch (error: any) {
    logger.error("Error updating store", {
      storeId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllStores = async (): Promise<
  StoreDocument[]
> => {
  logger.info("Getting all stores");

  return storeRepository.getAllStores();
};

export const getStoreById = async (
  id: string,
): Promise<StoreDocument | null> => {
  logger.info(`Getting store with ID ${id}`);

  return storeRepository.findById(id);
};

export const deleteStore = async (
  storeId: string,
): Promise<StoreDocument | null> => {
  try {
    logger.info(
      `Deleting store with ID ${storeId}`,
    );

    const deletedStore =
      await storeRepository.deleteStore(storeId);

    if (!deletedStore) {
      throw new Error(
        `Store with ID ${storeId} not found`,
      );
    }

    logger.info("Store deleted successfully", {
      storeId,
    });

    return deletedStore;
  } catch (error: any) {
    logger.error("Error deleting store", {
      storeId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateStoreStatus = async (
  id: string,
  updatedData: Partial<StoreDocument>,
): Promise<StoreDocument | null> => {
  try {
    logger.info(
      `Updating status for store with ID ${id} to ${updatedData.status}`,
    );

    const updatedStore =
      await storeRepository.changeStoreStatus(
        id,
        updatedData,
      );

    if (!updatedStore) {
      throw new Error(
        `Store with ID ${id} not found`,
      );
    }

    logger.info("Store status updated successfully", {
      storeId: id,
      status: updatedData.status,
    });

    return updatedStore;
  } catch (error: any) {
    logger.error("Error updating store status", {
      storeId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};