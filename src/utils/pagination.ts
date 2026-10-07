import { Model } from "mongoose";

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const paginate = async <T>(
  model: Model<T>,
  filter: Record<string, unknown> = {},
  options: PaginationOptions = {},
  sort: Record<string, 1 | -1> = { createdAt: -1 },
): Promise<PaginationResponse<T>> => {
  const page = Math.max(Number(options.page) || 1, 1);

  const limit = Math.min(
    Math.max(Number(options.limit) || 10, 1),
    100,
  );

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec(),

    model.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};