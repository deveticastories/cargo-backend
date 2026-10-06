import mongoose from "mongoose";
import logger from "../../utils/logger";

import * as employeeRepository from "./employeeRepository";
import { EmployeeDocument } from "../../models/employeeModel";

export const createEmployeeProfile = async (
  employeeData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument> => {
  try {
    logger.info("Creating a new employee profile", { employeeData });

    if (employeeData.email) {
      const existingEmployee = await employeeRepository.findByEmail(
        employeeData.email,
      );

      if (existingEmployee) {
        throw new Error(
          `Employee with email '${employeeData.email}' already exists.`,
        );
      }
    }

    const newEmployeeProfile =
      await employeeRepository.create(employeeData);

    logger.info("Employee profile created successfully", {
      employeeId: newEmployeeProfile._id,
      email: newEmployeeProfile.email,
    });

    return newEmployeeProfile;
  } catch (error: any) {
    logger.error("Error creating employee profile", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editEmployeeProfile = async (
  employeeId: string,
  employeeData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument | null> => {
  try {
    logger.info(`Editing employee profile with ID ${employeeId}`, {
      employeeData,
    });

    if (employeeData.email) {
      const existingEmployee = await employeeRepository.findByEmail(
        employeeData.email,
      );

      if (
        existingEmployee &&
        existingEmployee._id.toString() !== employeeId
      ) {
        throw new Error(
          `Employee with email '${employeeData.email}' already exists.`,
        );
      }
    }

    const updatedEmployeeProfile =
      await employeeRepository.updateById(
        employeeId,
        employeeData,
      );

    if (!updatedEmployeeProfile) {
      throw new Error(
        `Employee profile with ID ${employeeId} not found`,
      );
    }

    logger.info("Employee profile updated successfully", {
      employeeId: updatedEmployeeProfile._id,
    });

    return updatedEmployeeProfile;
  } catch (error: any) {
    logger.error("Error updating employee profile", {
      employeeId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllEmployees = async (): Promise<EmployeeDocument[]> => {
  logger.info("Getting all employees");

  return employeeRepository.getAllEmployees();
};

export const getEmployeeById = async (
  id: string,
): Promise<EmployeeDocument | null> => {
  logger.info(`Getting employee with ID ${id}`);

  return employeeRepository.findById(id);
};

export const deleteEmployee = async (
  employeeId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<EmployeeDocument | null> => {
  try {
    logger.info(
      `Deleting employee with ID ${employeeId} by user ${deletedBy}`,
    );

    const deletedEmployee = await employeeRepository.deleteEmployee(
      employeeId,
      deletedBy,
    );

    if (!deletedEmployee) {
      throw new Error(
        `Employee profile with ID ${employeeId} not found`,
      );
    }

    logger.info("Employee profile deleted successfully", {
      employeeId,
    });

    return deletedEmployee;
  } catch (error: any) {
    logger.error("Error deleting employee profile", {
      employeeId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateEmployeeStatus = async (
  id: string,
  updatedData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument | null> => {
  try {
    logger.info(
      `Updating status for employee with ID ${id} to ${updatedData.status}`,
    );

    const updatedStatus =
      await employeeRepository.changeEmployeeStatus(
        id,
        updatedData,
      );

    if (!updatedStatus) {
      throw new Error(
        `Employee profile with ID ${id} not found`,
      );
    }

    logger.info("Employee status updated successfully", {
      employeeId: id,
      status: updatedData.status,
    });

    return updatedStatus;
  } catch (error: any) {
    logger.error("Error updating employee status", {
      employeeId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};