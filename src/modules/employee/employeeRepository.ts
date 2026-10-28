import mongoose from "mongoose";
import User, { UserDocument } from "../../models/userModel";

export const create = async (
  employeeData: Partial<UserDocument>,
): Promise<UserDocument> => {
  const employee = new User(employeeData);
  return await employee.save();
};

export const findById = async (
  id: string,
): Promise<UserDocument | null> => {
  return User.findOne({
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
): Promise<UserDocument | null> => {
  return User.findOne({
    empId: empId.trim(),
    isDeleted: false,
  })
    .populate("role")
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<UserDocument>,
): Promise<UserDocument | null> => {
  return User.findOneAndUpdate(
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

export const getAllEmployees = async (): Promise<UserDocument[]> => {
  return User.find({ isDeleted: false })
    .populate("role")
    .populate("createdBy", "name email")
    .populate("updatedBy", "name email")
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteEmployee = async (
  employeeId: string,
  deletedBy: mongoose.Types.ObjectId,
): Promise<UserDocument | null> => {
  return User.findOneAndUpdate(
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
  updatedData: Partial<UserDocument>,
): Promise<UserDocument | null> => {
  return User.findOneAndUpdate(
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
): Promise<UserDocument | null> => {
  return User.findOne({
    email: email.trim().toLowerCase(),
    isDeleted: false,
  })
    .select("+password")
    .populate("role")
    .exec();
};