
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
  return Customer.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("country", "name location")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<CustomerDocument>,
): Promise<CustomerDocument | null> => {
  return Customer.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("country", "name location")
    .exec();
};

export const getAllCustomers = async (): Promise<CustomerDocument[]> => {
  return Customer.find({
    isDeleted: false,
  })
    .populate("country", "name location")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteCustomer = async (
  customerId: string,
): Promise<CustomerDocument | null> => {
  return Customer.findOneAndUpdate(
    {
      _id: customerId,
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    },
    {
      new: true,
    },
  )
    .populate("country", "name location")
    .exec();
};

export const changeCustomerStatus = async (
  id: string,
  updatedData: Partial<CustomerDocument>,
): Promise<CustomerDocument | null> => {
  return Customer.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      $set: {
        status: updatedData.status,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .populate("country", "name location")
    .exec();
};

export const findByWhatsapp = async (
  whatsapp: string,
): Promise<CustomerDocument | null> => {
  return Customer.findOne({
    whatsapp: whatsapp.trim(),
    isDeleted: false,
  })
    .populate("country", "name location")
    .exec();
};
