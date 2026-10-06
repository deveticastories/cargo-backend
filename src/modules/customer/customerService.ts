import logger from "../../utils/logger";

import * as customerRepository from "./customerRepository";
import { CustomerDocument } from "../../models/customerModel";

export const createCustomer = async (
  customerData: Partial<CustomerDocument>,
): Promise<CustomerDocument> => {
  try {
    logger.info("Creating a new customer", { customerData });

    if (customerData.whatsapp) {
      const existingCustomer =
        await customerRepository.findByWhatsapp(
          customerData.whatsapp,
        );

      if (existingCustomer) {
        throw new Error(
          `Customer with WhatsApp '${customerData.whatsapp}' already exists.`,
        );
      }
    }

    const newCustomer =
      await customerRepository.create(customerData);

    logger.info("Customer created successfully", {
      customerId: newCustomer._id,
      whatsapp: newCustomer.whatsapp,
    });

    return newCustomer;
  } catch (error: any) {
    logger.error("Error creating customer", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editCustomer = async (
  customerId: string,
  customerData: Partial<CustomerDocument>,
): Promise<CustomerDocument | null> => {
  try {
    logger.info(`Editing customer with ID ${customerId}`, {
      customerData,
    });

    if (customerData.whatsapp) {
      const existingCustomer =
        await customerRepository.findByWhatsapp(
          customerData.whatsapp,
        );

      if (
        existingCustomer &&
        existingCustomer._id.toString() !== customerId
      ) {
        throw new Error(
          `Customer with WhatsApp '${customerData.whatsapp}' already exists.`,
        );
      }
    }

    const updatedCustomer =
      await customerRepository.updateById(
        customerId,
        customerData,
      );

    if (!updatedCustomer) {
      throw new Error(
        `Customer with ID ${customerId} not found`,
      );
    }

    logger.info("Customer updated successfully", {
      customerId: updatedCustomer._id,
    });

    return updatedCustomer;
  } catch (error: any) {
    logger.error("Error updating customer", {
      customerId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllCustomers = async (): Promise<
  CustomerDocument[]
> => {
  logger.info("Getting all customers");

  return customerRepository.getAllCustomers();
};

export const getCustomerById = async (
  id: string,
): Promise<CustomerDocument | null> => {
  logger.info(`Getting customer with ID ${id}`);

  return customerRepository.findById(id);
};

export const deleteCustomer = async (
  customerId: string,
): Promise<CustomerDocument | null> => {
  try {
    logger.info(
      `Deleting customer with ID ${customerId}`,
    );

    const deletedCustomer =
      await customerRepository.deleteCustomer(customerId);

    if (!deletedCustomer) {
      throw new Error(
        `Customer with ID ${customerId} not found`,
      );
    }

    logger.info("Customer deleted successfully", {
      customerId,
    });

    return deletedCustomer;
  } catch (error: any) {
    logger.error("Error deleting customer", {
      customerId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateCustomerStatus = async (
  id: string,
  updatedData: Partial<CustomerDocument>,
): Promise<CustomerDocument | null> => {
  try {
    logger.info(
      `Updating status for customer with ID ${id} to ${updatedData.status}`,
    );

    const updatedCustomer =
      await customerRepository.changeCustomerStatus(
        id,
        updatedData,
      );

    if (!updatedCustomer) {
      throw new Error(
        `Customer with ID ${id} not found`,
      );
    }

    logger.info("Customer status updated successfully", {
      customerId: id,
      status: updatedData.status,
    });

    return updatedCustomer;
  } catch (error: any) {
    logger.error("Error updating customer status", {
      customerId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};