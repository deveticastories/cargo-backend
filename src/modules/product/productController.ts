import { Response } from "express";
import * as productService from "./productService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createProduct = async (
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

    const productData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdProduct =
      await productService.createProduct(productData);

    return res.status(201).json({
      success: true,
      message: message.PRODUCT_CREATED,
      product: createdProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editProduct = async (
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
      message: message.INVALID_PRODUCT_ID,
    });
  }

  try {
    const existingProduct =
      await productService.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: message.PRODUCT_NOT_FOUND,
      });
    }

    const productData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedProduct =
      await productService.editProduct(
        id,
        productData,
      );

    return res.status(200).json({
      success: true,
      message: message.PRODUCT_UPDATED,
      product: updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (
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
        message: message.INVALID_PRODUCT_ID,
      });
    }

    const deletedProduct =
      await productService.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: message.PRODUCT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PRODUCT_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (
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
        message: message.INVALID_PRODUCT_ID,
      });
    }

    const product =
      await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: message.PRODUCT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (
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

    const products =
      await productService.getAllProducts();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProductStatus = async (
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
      message: message.INVALID_PRODUCT_ID,
    });
  }

  try {
    const productStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedProduct =
      await productService.updateProductStatus(
        id,
        productStatusUpdateData,
      );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: message.PRODUCT_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.PRODUCT_STATUS_UPDATED,
      product: updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};