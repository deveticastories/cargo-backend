import Customer, {
  CustomerDocument,
} from "../../models/customerModel";

export const create = async (
  customerData: Partial<CustomerDocument>,
): Promise<CustomerDocument> => {
  const customer = new Customer(customerData);

  return await customer.save();
};

export const findById = async (
  id: string,
): Promise<CustomerDocument | null> => {
  return Customer.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<CustomerDocument>,
): Promise<CustomerDocument | null> => {
  return Customer.findByIdAndUpdate(
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

export const getAllCustomers = async (): Promise<CustomerDocument[]> => {
  return Customer.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteCustomer = async (
  customerId: string,
): Promise<CustomerDocument | null> => {
  return Customer.findByIdAndUpdate(
    customerId,
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

export const changeCustomerStatus = async (
  id: string,
  updatedData: Partial<CustomerDocument>,
): Promise<CustomerDocument | null> => {
  return Customer.findByIdAndUpdate(
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

export const findByWhatsapp = async (
  whatsapp: string,
): Promise<CustomerDocument | null> => {
  return Customer.findOne({
    whatsapp: whatsapp.trim(),
  }).exec();
};