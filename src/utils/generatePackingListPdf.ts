import PDFDocument from "pdfkit";
import { Response } from "express";

interface CustomerData {
  name?: string;
  whatsapp?: string;
  alternativeNo?: string;
  country?: string;
  location?: string;
}

interface PickupPartnerData {
  name?: string;
  whatsapp?: string;
}

interface ProductData {
  product?: {
    name?: string;
  } | null;

  quantity: number;

  fabric?: {
    name?: string;
  } | null;

  description?: string;
}

interface BundleData {
  bundleNo: number;
  netWeight: number;
  grossWeight: number;
  products: ProductData[];
}

interface BookingData {
  bookingId?: string;
  date?: Date | string;

  sender?: CustomerData | null;

  receiver?: CustomerData | null;

  pickupOption?: PickupPartnerData | null;
}

interface PackageData {
  booking?: BookingData | null;
  bundles: BundleData[];
}

const formatDate = (
  date?: Date | string,
): string => {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getCustomerDetails = (
  customer?: CustomerData | null,
): string => {
  if (!customer) {
    return "-";
  }

  const details: string[] = [];

  if (customer.name) {
    details.push(customer.name);
  }

  if (customer.location) {
    details.push(customer.location);
  }

  if (customer.country) {
    details.push(customer.country);
  }

  if (customer.whatsapp) {
    details.push(`Ph: ${customer.whatsapp}`);
  }

  if (customer.alternativeNo) {
    details.push(`Alt: ${customer.alternativeNo}`);
  }

  return details.length
    ? details.join("\n")
    : "-";
};

export const generatePackingListPdf = (
  packageData: PackageData,
  res: Response,
): void => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
  });

  const booking = packageData.booking;

  const bookingId =
    booking?.bookingId || "packing-list";

  const filename =
    `${bookingId}-packing-list.pdf`;

  res.setHeader(
    "Content-Type",
    "application/pdf",
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`,
  );

  doc.pipe(res);

  /*
   * ==========================================
   * COMPANY HEADER
   * ==========================================
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .text("INTROLINES PVT LTD", {
      align: "center",
    });

  doc
    .font("Helvetica")
    .fontSize(9)
    .text(
      "Mob: +91 86818 00075 | Email: info@introlines.in",
      {
        align: "center",
      },
    );

  doc.moveDown(1);

  /*
   * ==========================================
   * TITLE
   * ==========================================
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("PACKING LIST", {
      align: "center",
    });

  doc.moveDown(1);

  /*
   * ==========================================
   * BOOKING INFORMATION
   * ==========================================
   */

  const startX = 40;
  const infoY = doc.y;

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(
      "LR No.",
      startX,
      infoY,
    );

  doc
    .font("Helvetica")
    .text(
      bookingId,
      startX + 70,
      infoY,
    );

  doc
    .font("Helvetica-Bold")
    .text(
      "Booking Date",
      startX + 300,
      infoY,
    );

  doc
    .font("Helvetica")
    .text(
      formatDate(booking?.date),
      startX + 390,
      infoY,
    );

  doc.moveDown(2);

  /*
   * ==========================================
   * SENDER / RECEIVER
   * ==========================================
   */

  const customerY = doc.y;

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(
      "From (Sender Name & Details)",
      startX,
      customerY,
    );

  doc
    .font("Helvetica-Bold")
    .text(
      "Customer Name (Receiver Name & Details)",
      startX + 280,
      customerY,
    );

  doc
    .font("Helvetica")
    .fontSize(9)
    .text(
      getCustomerDetails(booking?.sender),
      startX,
      customerY + 18,
      {
        width: 220,
        lineGap: 3,
      },
    );

  doc
    .text(
      getCustomerDetails(booking?.receiver),
      startX + 280,
      customerY + 18,
      {
        width: 220,
        lineGap: 3,
      },
    );

  doc.moveDown(5);

  /*
   * ==========================================
   * PRODUCT TABLE
   * ==========================================
   */

  const tableX = 40;
  let currentY = doc.y;

  const bundleWidth = 100;
  const productWidth = 315;
  const qtyWidth = 100;

  const productX =
    tableX + bundleWidth;

  const qtyX =
    productX + productWidth;

  const rowHeight = 28;

  /*
   * TABLE HEADER
   */

  doc
    .rect(
      tableX,
      currentY,
      bundleWidth,
      rowHeight,
    )
    .stroke();

  doc
    .rect(
      productX,
      currentY,
      productWidth,
      rowHeight,
    )
    .stroke();

  doc
    .rect(
      qtyX,
      currentY,
      qtyWidth,
      rowHeight,
    )
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(
      "Bundle No",
      tableX + 8,
      currentY + 9,
    );

  doc.text(
    "Products",
    productX + 8,
    currentY + 9,
  );

  doc.text(
    "Product Qty",
    qtyX + 8,
    currentY + 9,
  );

  currentY += rowHeight;

  /*
   * ==========================================
   * BUNDLES / PRODUCTS
   * ==========================================
   */

  let totalQty = 0;

  for (const bundle of packageData.bundles || []) {
    const products =
      bundle.products || [];

    /*
     * Bundle without products
     */

    if (products.length === 0) {
      doc
        .rect(
          tableX,
          currentY,
          bundleWidth,
          rowHeight,
        )
        .stroke();

      doc
        .rect(
          productX,
          currentY,
          productWidth,
          rowHeight,
        )
        .stroke();

      doc
        .rect(
          qtyX,
          currentY,
          qtyWidth,
          rowHeight,
        )
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(9)
        .text(
          String(bundle.bundleNo),
          tableX + 40,
          currentY + 9,
        );

      doc.text(
        "-",
        productX + 8,
        currentY + 9,
      );

      doc.text(
        "0",
        qtyX + 8,
        currentY + 9,
      );

      currentY += rowHeight;

      continue;
    }

    /*
     * Products inside bundle
     */

    products.forEach(
      (product, index) => {
        const productName =
          product.product?.name ||
          product.description ||
          "-";

        const quantity =
          product.quantity || 0;

        totalQty += quantity;

        /*
         * Check page before creating row
         */

        if (currentY > 720) {
          doc.addPage();

          currentY = 50;
        }

        /*
         * Bundle cell
         */

        doc
          .rect(
            tableX,
            currentY,
            bundleWidth,
            rowHeight,
          )
          .stroke();

        /*
         * Product cell
         */

        doc
          .rect(
            productX,
            currentY,
            productWidth,
            rowHeight,
          )
          .stroke();

        /*
         * Quantity cell
         */

        doc
          .rect(
            qtyX,
            currentY,
            qtyWidth,
            rowHeight,
          )
          .stroke();

        /*
         * Bundle number
         *
         * Only display once for the
         * first product of the bundle.
         */

        if (index === 0) {
          doc
            .font("Helvetica")
            .fontSize(9)
            .text(
              String(bundle.bundleNo),
              tableX + 40,
              currentY + 9,
            );
        }

        /*
         * Product name
         */

        doc
          .font("Helvetica")
          .fontSize(9)
          .text(
            productName,
            productX + 8,
            currentY + 9,
            {
              width:
                productWidth - 16,
            },
          );

        /*
         * Quantity
         */

        doc.text(
          String(quantity),
          qtyX + 8,
          currentY + 9,
        );

        currentY += rowHeight;
      },
    );
  }

  /*
   * ==========================================
   * TOTAL
   * ==========================================
   */

  doc
    .rect(
      tableX,
      currentY,
      bundleWidth,
      rowHeight,
    )
    .stroke();

  doc
    .rect(
      productX,
      currentY,
      productWidth,
      rowHeight,
    )
    .stroke();

  doc
    .rect(
      qtyX,
      currentY,
      qtyWidth,
      rowHeight,
    )
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(
      "Total Qty",
      productX + 8,
      currentY + 9,
    );

  doc
    .font("Helvetica-Bold")
    .text(
      String(totalQty),
      qtyX + 8,
      currentY + 9,
    );

  currentY += rowHeight + 25;

  /*
   * ==========================================
   * NOTE
   * ==========================================
   */

  doc
    .font("Helvetica")
    .fontSize(8)
    .text(
      "Note: Each Bundle No covers all product lines listed beside it; add more rows under the same bundle for additional products.",
      tableX,
      currentY,
      {
        width: 515,
      },
    );

  doc.end();
};