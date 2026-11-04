import PickupPartnerModel from "../models/pickupPartnerModel";

export const seedPickupPartners = async (): Promise<void> => {
    const pickupPartners = [
        {
            name: "Our Pick Boy",
        },
        {
            name: "Direct to Store",
        },
    ];

    for (const partner of pickupPartners) {
        await PickupPartnerModel.findOneAndUpdate(
            {
                name: partner.name,
                isDeleted: false,
            },
            {
                $set: {
                    name: partner.name,
                },
            },
            {
                upsert: true,
                returnDocument: "after",
                setDefaultsOnInsert: true,
            },
        );
    }

};