
import Invoice, {
  InvoiceDocument,
} from "../../models/invoiceModel.js";

export const getLastInvoice = async (): Promise<InvoiceDocument | null> => {
  return Invoice.findOne({
    invoiceNo: /^INV-\d+$/,
  })
    .sort({ createdAt: -1 })
    .exec();
};

export const create = async (
  invoiceData: Partial<InvoiceDocument>,
): Promise<InvoiceDocument> => {
  const invoice = new Invoice(invoiceData);
  await invoice.save();

  return (
    (await findById(invoice._id.toString())) ?? invoice
  );
};

export const getAllInvoices = async (): Promise<InvoiceDocument[]> => {
  return Invoice.find({ isDeleted: false })
    .populate("container")
    .populate("booking")
    .populate("deliveryPartner")
    .sort({ createdAt: -1 })
    .exec();
};

export const findById = async (
  id: string,
): Promise<InvoiceDocument | null> => {
  return Invoice.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("container")
    .populate("booking")
    .populate("deliveryPartner")
    .exec();
};
