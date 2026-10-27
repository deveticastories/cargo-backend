import mongoose from "mongoose";
import Employee, {
  EmployeeDocument,
} from "../../models/employeeModel";

export const create = async (
  employeeData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument> => {
  const employee = new Employee(employeeData);
  return await employee.save();
};

export const findById = async (
  id: string,
): Promise<EmployeeDocument | null> => {
  return Employee.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("role")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .exec();
};

export const findByEmpId = async (
  empId: string,
): Promise<EmployeeDocument | null> => {
  return Employee.findOne({
    empId: empId.trim(),
    isDeleted: false,
  })
    .populate("role")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument | null> => {
  return Employee.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      $set: {
        ...updateData,
        updatedBy: updateData.updatedBy,
      },
    },
    { new: true, runValidators: true },
  )
    .populate("role")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .exec();
};

export const getAllEmployees = async (): Promise<EmployeeDocument[]> => {
  return Employee.find({ isDeleted: false })
    .populate("role")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteEmployee = async (
  employeeId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<EmployeeDocument | null> => {
  return Employee.findOneAndUpdate(
    { _id: employeeId, isDeleted: false },
    {
      $set: {
        isDeleted: true,
        deletedBy,
        deletedAt: new Date(),
      },
    },
    { new: true },
  )
    .populate("role")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .exec();
};

export const changeEmployeeStatus = async (
  id: string,
  updatedData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument | null> => {
  return Employee.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      $set: {
        status: updatedData.status,
        updatedBy: updatedData.updatedBy,
      },
    },
    { new: true, runValidators: true },
  )
    .populate("role")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .exec();
};

export const findByEmail = async (
  email: string,
): Promise<EmployeeDocument | null> => {
  return Employee.findOne({
    email: email.trim().toLowerCase(),
    isDeleted: false,
  })
    .select("+password")
    .populate("role")
    .exec();
};