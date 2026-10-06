import { Response } from "express";
import * as storeService from "./storeService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createStore = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const storeData = {
      ...req.body,
    };

    const createdStore =
      await storeService.createStore(storeData);

    return res.status(201).json({
      success: true,
      message: message.STORE_CREATED,
      store: createdStore,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editStore = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_STORE_ID,
    });
  }

  try {
    const existingStore =
      await storeService.getStoreById(id);

    if (!existingStore) {
      return res.status(404).json({
        success: false,
        message: message.STORE_NOT_FOUND,
      });
    }

    const storeData = {
      ...req.body,
    };

    const updatedStore =
      await storeService.editStore(id, storeData);

    return res.status(200).json({
      success: true,
      message: message.STORE_UPDATED,
      store: updatedStore,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStore = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: message.INVALID_STORE_ID,
      });
    }

    const deletedStore =
      await storeService.deleteStore(id);

    if (!deletedStore) {
      return res.status(404).json({
        success: false,
        message: message.STORE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.STORE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStoreById = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: message.INVALID_STORE_ID,
      });
    }

    const store =
      await storeService.getStoreById(id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: message.STORE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      store,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllStores = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: message.UNAUTHORIZED,
      });
    }

    const stores =
      await storeService.getAllStores();

    return res.status(200).json({
      success: true,
      stores,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStoreStatus = async (
  req: RequestWithAuthData,
  res: Response,
) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      success: false,
      message: message.UNAUTHORIZED,
    });
  }

  if (typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: message.INVALID_STORE_ID,
    });
  }

  try {
    const updatedStore =
      await storeService.updateStoreStatus(
        id,
        req.body,
      );

    if (!updatedStore) {
      return res.status(404).json({
        success: false,
        message: message.STORE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.STORE_STATUS_UPDATED,
      store: updatedStore,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};