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
  return Employee.findById(id)
    .where({ isDeleted: false })
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument | null> => {
  return Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        ...updateData,
        updatedBy: updateData.updatedBy,
      },
    },
    { new: true, runValidators: true },
  )
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .exec();
};

export const getAllEmployees = async (): Promise<EmployeeDocument[]> => {
  return Employee.find({ isDeleted: false })
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteEmployee = async (
  employeeId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<EmployeeDocument | null> => {
  return Employee.findByIdAndUpdate(
    employeeId,
    {
      $set: {
        isDeleted: true,
        deletedBy,
        deletedAt: new Date(),
      },
    },
    { new: true },
  ).exec();
};

export const changeEmployeeStatus = async (
  id: string,
  updatedData: Partial<EmployeeDocument>,
): Promise<EmployeeDocument | null> => {
  return Employee.findByIdAndUpdate(
    id,
    {
      $set: {
        status: updatedData.status,
        updatedBy: updatedData.updatedBy,
      },
    },
    { new: true, runValidators: true },
  ).exec();
};
export const findByEmail = async (
  email: string,
): Promise<EmployeeDocument | null> => {
  return Employee.findOne({
    email: email.toLowerCase().trim(),
  }).exec();
};