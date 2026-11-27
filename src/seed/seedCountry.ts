import CountryModel from "../models/countryModel";

export const seedCountries = async (): Promise<void> => {
  const countries = [
    {
      name: "UAE",
      location: ["AJMAN", "SHARJAH", "ABUDHABI", "FUJAIRAH", "DUBAI"],
    },
    {
      name: "OMAN",
      location: ["SALALAH", "OMAN"],
    },
    {
      name: "SAUDI",
      location: ["DAMMAM", "RIYADH", "JIDDAH", "KAMMIS MUSAYTH"],
    },
    {
      name: "QATAR",
      location: ["DOHA"],
    },
    {
      name: "KUWAIT",
      location: ["KUWAIT"],
    },
    {
      name: "BAHRAIN",
      location: ["BAHRAIN"],
    },
  ];

  for (const country of countries) {
    await CountryModel.findOneAndUpdate(
      {
        name: country.name,
        isDeleted: false,
      },
      {
        $set: {
          name: country.name,
          location: country.location,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      }
    );
  }
};