import mongoose, { Schema, Document } from "mongoose";
import { BaseDocument, BaseSchema } from "./baseModel";

export interface Container extends BaseDocument {
  containerCode: string;

  company: string;

  stuffingCode?: string;

  stuffingDate: Date;

  cutOffDate?: Date;

  etaCok?: Date;

  etdCok?: Date;

  etaUae?: Date;

  containerStatus: "Active" | "Inactive" | "Stuffed";
}

export type ContainerDocument = Container & Document;

const ContainerSchema: Schema<Container> = new Schema({
  containerCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  company: {
    type: String,
    required: true,
    trim: true,
  },

  stuffingCode: {
    type: String,
    trim: true,
  },

  stuffingDate: {
    type: Date,
    required: true,
  },

  cutOffDate: {
    type: Date,
  },

  etaCok: {
    type: Date,
  },

  etdCok: {
    type: Date,
  },

  etaUae: {
    type: Date,
  },

  containerStatus: {
    type: String,
    enum: ["Active", "Inactive", "Stuffed"],
    default: "Active",
  },
});

ContainerSchema.add(BaseSchema);

export default mongoose.model<ContainerDocument>(
  "Container",
  ContainerSchema,
);