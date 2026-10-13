
import mongoose from "mongoose";
import { InvoiceDocument } from "../../models/invoiceModel.js";
import * as invoiceRepository from "./invoiceRepository.js";
import * as bookingService from "../booking/bookingService.js";
import * as pricingService from "../price/priceService.js";
import * as customerService from "../customer/customerService.js";

interface CreateInvoiceInput {
  container: string;
  booking: string;
  deliveryPartner: string;
  receivableDiscount?: number;
  createdBy?: mongoose.Types.ObjectId | string;
}

export const createInvoice = async (
  invoiceData: CreateInvoiceInput,
): Promise<InvoiceDocument> => {
  if (
    !mongoose.Types.ObjectId.isValid(invoiceData.container) ||
    !mongoose.Types.ObjectId.isValid(invoiceData.booking) ||
    !mongoose.Types.ObjectId.isValid(invoiceData.deliveryPartner)
  ) {
    throw new Error("Invalid container, booking, or delivery partner ID");
  }

  const booking = await bookingService.getBookingById(
    invoiceData.booking,
  );
  console.log("Booking retrieved:", booking);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const quantity = booking.bundle;

  if (
    quantity == null ||
    !Number.isFinite(quantity) ||
    quantity <= 0
  ) {
    throw new Error("Booking bundle quantity must be greater than zero");
  }

  const pricing = await pricingService.getPricingByUom(
    booking.bundleType,
  );

  if (!pricing) {
    throw new Error(
      `Pricing not found for India to UAE with UOM '${booking.bundleType}'`,
    );
  }

  if (!booking.receiver) {
    throw new Error("Booking receiver is missing");
  }

  const receiverId =
    typeof booking.receiver === "object" &&
    "_id" in booking.receiver
      ? booking.receiver._id.toString()
      : String(booking.receiver);

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    throw new Error("Invalid receiver customer ID");
  }

  const receiver =
    await customerService.getCustomerById(receiverId);

  if (!receiver) {
    throw new Error("Receiver customer not found");
  }

  if (receiver.isDeleted || !receiver.status) {
    throw new Error("Receiver customer is deleted or inactive");
  }

  const receivableDiscount = receiver.discount ?? 0;

  if (
    !Number.isFinite(receivableDiscount) ||
    receivableDiscount < 0
  ) {
    throw new Error(
      "Receiver discount must be a valid non-negative number",
    );
  }

  const brandHandlingCharge = booking.brandHandlingCharge ?? 0;
  const pickupCharge = booking.pickupCharge ?? 0;

  if (
    !Number.isFinite(brandHandlingCharge) ||
    brandHandlingCharge < 0 ||
    !Number.isFinite(pickupCharge) ||
    pickupCharge < 0
  ) {
    throw new Error(
      "Booking charges must be valid non-negative numbers",
    );
  }

  const subtotal = Number(
    (pricing.price * quantity).toFixed(2),
  );

  const additionalCharges = Number(
    (brandHandlingCharge + pickupCharge).toFixed(2),
  );

  if (receivableDiscount > subtotal + additionalCharges) {
    throw new Error(
      "Receiver discount cannot exceed the total amount",
    );
  }

  const total = Number(
    (
      subtotal +
      additionalCharges -
      receivableDiscount
    ).toFixed(2),
  );

  const lastInvoice = await invoiceRepository.getLastInvoice();

  const lastNumber = lastInvoice
    ? Number(lastInvoice.invoiceNo.replace("INV-", ""))
    : 0;

  const invoiceNo = `INV-${String(lastNumber + 1).padStart(4, "0")}`;

  return invoiceRepository.create({
    invoiceNo,
    container: new mongoose.Types.ObjectId(invoiceData.container),
    booking: new mongoose.Types.ObjectId(invoiceData.booking),
    deliveryPartner: new mongoose.Types.ObjectId(
      invoiceData.deliveryPartner,
    ),
    subtotal,
    additionalCharges,
    receivableDiscount,
    total,
    createdBy: invoiceData.createdBy
      ? new mongoose.Types.ObjectId(
          invoiceData.createdBy.toString(),
        )
      : undefined,
  });
};
export const getAllInvoices = async () => {
  const invoices = await invoiceRepository.getAllInvoices();

  return {
    totalInvoices: invoices.length,
    invoiceList: invoices,
  };
};

export const getInvoiceById = async (
  id: string,
): Promise<InvoiceDocument> => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid invoice ID");
  }

  const invoice = await invoiceRepository.findById(id);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  return invoice;
};
