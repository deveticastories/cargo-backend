import logger from "../../utils/logger";

import * as countryRepository from "./countryRepository";
import { CountryDocument } from "../../models/countryModel";

export const createCountry = async (
  countryData: Partial<CountryDocument>,
): Promise<CountryDocument> => {
  try {
    logger.info("Creating a new country", {
      countryData,
    });

    if (countryData.name) {
      const existingCountry =
        await countryRepository.findByName(
          countryData.name,
        );

      if (existingCountry) {
        throw new Error(
          `Country with name '${countryData.name}' already exists.`,
        );
      }
    }

    const newCountry =
      await countryRepository.create(countryData);

    logger.info("Country created successfully", {
      countryId: newCountry._id,
      name: newCountry.name,
    });

    return newCountry;
  } catch (error: any) {
    logger.error("Error creating country", {
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const editCountry = async (
  countryId: string,
  countryData: Partial<CountryDocument>,
): Promise<CountryDocument | null> => {
  try {
    logger.info(`Editing country with ID ${countryId}`, {
      countryData,
    });

    if (countryData.name) {
      const existingCountry =
        await countryRepository.findByName(
          countryData.name,
        );

      if (
        existingCountry &&
        existingCountry._id.toString() !== countryId
      ) {
        throw new Error(
          `Country with name '${countryData.name}' already exists.`,
        );
      }
    }

    const updatedCountry =
      await countryRepository.updateById(
        countryId,
        countryData,
      );

    if (!updatedCountry) {
      throw new Error(
        `Country with ID ${countryId} not found`,
      );
    }

    logger.info("Country updated successfully", {
      countryId: updatedCountry._id,
    });

    return updatedCountry;
  } catch (error: any) {
    logger.error("Error updating country", {
      countryId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const getAllCountries = async (): Promise<
  CountryDocument[]
> => {
  logger.info("Getting all countries");

  return countryRepository.getAllCountries();
};

export const getCountryById = async (
  id: string,
): Promise<CountryDocument | null> => {
  logger.info(`Getting country with ID ${id}`);

  return countryRepository.findById(id);
};

export const deleteCountry = async (
  countryId: string,
): Promise<CountryDocument | null> => {
  try {
    logger.info(
      `Deleting country with ID ${countryId}`,
    );

    const deletedCountry =
      await countryRepository.deleteCountry(countryId);

    if (!deletedCountry) {
      throw new Error(
        `Country with ID ${countryId} not found`,
      );
    }

    logger.info("Country deleted successfully", {
      countryId,
    });

    return deletedCountry;
  } catch (error: any) {
    logger.error("Error deleting country", {
      countryId,
      error: error.message,
    });

    throw new Error(error.message);
  }
};

export const updateCountryStatus = async (
  id: string,
  updatedData: Partial<CountryDocument>,
): Promise<CountryDocument | null> => {
  try {
    logger.info(
      `Updating status for country with ID ${id} to ${updatedData.status}`,
    );

    const updatedCountry =
      await countryRepository.changeCountryStatus(
        id,
        updatedData,
      );

    if (!updatedCountry) {
      throw new Error(
        `Country with ID ${id} not found`,
      );
    }

    logger.info("Country status updated successfully", {
      countryId: id,
      status: updatedData.status,
    });

    return updatedCountry;
  } catch (error: any) {
    logger.error("Error updating country status", {
      countryId: id,
      error: error.message,
    });

    throw new Error(error.message);
  }
};