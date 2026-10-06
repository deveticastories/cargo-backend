import { Response } from "express";
import * as employeeService from "./employeeService";
import { message } from "../../constants/responseMessage";
import { RequestWithAuthData } from "../../@types/express";

export const createEmployeeProfile = async (
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

    const employeeData = {
      ...req.body,
      createdBy: req.userId,
    };

    const createdEmployee =
      await employeeService.createEmployeeProfile(employeeData);

    return res.status(201).json({
      success: true,
      message: message.EMPLOYEE_CREATED,
      employee: createdEmployee,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const editEmployeeProfile = async (
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
      message: "Invalid employee ID",
    });
  }

  try {
    const existingEmployee =
      await employeeService.getEmployeeById(id);

    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: message.EMPLOYEE_NOT_FOUND,
      });
    }

    const employeeData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedEmployee =
      await employeeService.editEmployeeProfile(id, employeeData);

    return res.status(200).json({
      success: true,
      message: message.EMPLOYEE_UPDATED,
      employee: updatedEmployee,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployeeProfile = async (
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
        message: "Invalid employee ID",
      });
    }

    const deletedEmployee =
      await employeeService.deleteEmployee(id, req.userId);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: message.EMPLOYEE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.EMPLOYEE_DELETED,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEmployeeById = async (
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
        message: "Invalid employee ID",
      });
    }

    const employee =
      await employeeService.getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: message.EMPLOYEE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEmployees = async (
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

    const employees =
      await employeeService.getAllEmployees();

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmployeeStatus = async (
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
      message: "Invalid employee ID",
    });
  }

  try {
    const employeeStatusUpdateData = {
      ...req.body,
      updatedBy: req.userId,
      updatedAt: new Date(),
    };

    const updatedEmployee =
      await employeeService.updateEmployeeStatus(
        id,
        employeeStatusUpdateData,
      );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: message.EMPLOYEE_NOT_FOUND,
      });
    }

    return res.status(200).json({
      success: true,
      message: message.EMPLOYEE_STATUS_UPDATED,
      employee: updatedEmployee,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};