import Product, {
  ProductDocument,
} from "../../models/productModel";

export const create = async (
  productData: Partial<ProductDocument>,
): Promise<ProductDocument> => {
  const product = new Product(productData);

  return await product.save();
};

export const findById = async (
  id: string,
): Promise<ProductDocument | null> => {
  return Product.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<ProductDocument>,
): Promise<ProductDocument | null> => {
  return Product.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  ).exec();
};

export const getAllProducts = async (): Promise<ProductDocument[]> => {
  return Product.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteProduct = async (
  productId: string,
): Promise<ProductDocument | null> => {
  return Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    { new: true },
  ).exec();
};

export const changeProductStatus = async (
  id: string,
  updatedData: Partial<ProductDocument>,
): Promise<ProductDocument | null> => {
  return Product.findByIdAndUpdate(
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
): Promise<ProductDocument | null> => {
  return Product.findOne({
    name: name.trim(),
    isDeleted: false,
  }).exec();
};