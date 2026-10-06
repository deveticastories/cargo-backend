import Country, {
  CountryDocument,
} from "../../models/countryModel";

export const create = async (
  countryData: Partial<CountryDocument>,
): Promise<CountryDocument> => {
  const country = new Country(countryData);

  return await country.save();
};

export const findById = async (
  id: string,
): Promise<CountryDocument | null> => {
  return Country.findById(id)
    .where({ isDeleted: false })
    .exec();
};

export const updateById = async (
  id: string,
  updateData: Partial<CountryDocument>,
): Promise<CountryDocument | null> => {
  return Country.findByIdAndUpdate(
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

export const getAllCountries = async (): Promise<
  CountryDocument[]
> => {
  return Country.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .exec();
};

export const deleteCountry = async (
  countryId: string,
): Promise<CountryDocument | null> => {
  return Country.findByIdAndUpdate(
    countryId,
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

export const changeCountryStatus = async (
  id: string,
  updatedData: Partial<CountryDocument>,
): Promise<CountryDocument | null> => {
  return Country.findByIdAndUpdate(
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

export const findByName = async (
  name: string,
): Promise<CountryDocument | null> => {
  return Country.findOne({
    name: name.trim(),
    isDeleted: false,
  }).exec();
};