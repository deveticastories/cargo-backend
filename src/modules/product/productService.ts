import logger from "../../utils/logger";
import * as productRepository from "./productRepository";
import { ProductDocument } from "../../models/productModel";

export const createProduct = async (
  productData: Partial<ProductDocument>,
): Promise<ProductDocument> => {
  try {
    logger.info("Creating a new product", {
      productData,
    });

    if (productData.name) {
      const existingProduct =
        await productRepository.findByName(productData.name);

      if (existingProduct) {
        throw new Error(
          `Product with name '${productData.name}' already exists.`,
        );
      }
    }

    const newProduct =
      await productRepository.create(productData);

    logger.info("Product created successfully", {
      productId: newProduct._id,
      name: newProduct.name,
    });

    return newProduct;
  } catch (error: any) {
    logger.error("Error creating product", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editProduct = async (
  productId: string,
  productData: Partial<ProductDocument>,
): Promise<ProductDocument | null> => {
  try {
    logger.info(
      `Editing product with ID ${productId}`,
      { productData },
    );

    if (productData.name) {
      const existingProduct =
        await productRepository.findByName(productData.name);

      if (
        existingProduct &&
        existingProduct._id.toString() !== productId
      ) {
        throw new Error(
          `Product with name '${productData.name}' already exists.`,
        );
      }
    }

    const updatedProduct =
      await productRepository.updateById(
        productId,
        productData,
      );

    if (!updatedProduct) {
      throw new Error(
        `Product with ID ${productId} not found`,
      );
    }

    logger.info("Product updated successfully", {
      productId: updatedProduct._id,
    });

    return updatedProduct;
  } catch (error: any) {
    logger.error("Error updating product", {
      productId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllProducts = async (): Promise<
  ProductDocument[]
> => {
  logger.info("Getting all products");

  return productRepository.getAllProducts();
};

export const getProductById = async (
  id: string,
): Promise<ProductDocument | null> => {
  logger.info(`Getting product with ID ${id}`);

  return productRepository.findById(id);
};

export const deleteProduct = async (
  productId: string,
): Promise<ProductDocument | null> => {
  try {
    logger.info(
      `Deleting product with ID ${productId}`,
    );

    const deletedProduct =
      await productRepository.deleteProduct(productId);

    if (!deletedProduct) {
      throw new Error(
        `Product with ID ${productId} not found`,
      );
    }

    logger.info("Product deleted successfully", {
      productId,
    });

    return deletedProduct;
  } catch (error: any) {
    logger.error("Error deleting product", {
      productId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateProductStatus = async (
  id: string,
  updatedData: Partial<ProductDocument>,
): Promise<ProductDocument | null> => {
  try {
    logger.info(
      `Updating status for product with ID ${id} to ${updatedData.status}`,
    );

    const updatedProduct =
      await productRepository.changeProductStatus(
        id,
        updatedData,
      );

    if (!updatedProduct) {
      throw new Error(
        `Product with ID ${id} not found`,
      );
    }

    logger.info("Product status updated successfully", {
      productId: id,
      status: updatedData.status,
    });

    return updatedProduct;
  } catch (error: any) {
    logger.error("Error updating product status", {
      productId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};