import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Cargo Backend API",
      version: "1.0.0",
      description: "API documentation for Cargo Backend",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Local development server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication APIs",
      },
      {
        name: "Users",
        description: "User management APIs",
      },
      {
        name: "Employees",
        description: "Employee management APIs",
      },
      {
        name: "Pickup Partners",
        description: "Pickup partner management APIs",
      },
      {
        name: "Customers",
        description: "Customer management APIs",
      },
      {
        name: "Stores",
        description: "Store management APIs",
      },
      {
        name: "Countries",
        description: "Country management APIs",
      },
      {
        name: "Delivery Partners",
        description: "Delivery partner management APIs",
      },
      {
        name: "Fabrics",
        description: "Fabric management APIs",
      },
      {
        name: "Pricing",
        description: "Pricing management APIs",
      },
      {
        name: "Products",
        description: "Product management APIs",
      },
      {
        name: "Pickup Assigns",
        description: "Pickup assignment management APIs",
      },
      {
        name: "PreBookings",
        description: "Pre-booking management APIs",
      },
      {
        name: "Bookings",
        description: "Booking management APIs",
      },
      {
        name: "Packages",
        description: "Package management APIs",
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        // =========================
        // AUTH
        // =========================

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              fPickupPartner: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    example: "665c2f8a9b12345678901234",
                  },

                  name: {
                    type: "string",
                    example: "ABC Pickup Services",
                  },

                  whatsapp: {
                    type: "string",
                    example: "+919876543210",
                  },

                  status: {
                    type: "boolean",
                    example: true,
                  },

                  isDeleted: {
                    type: "boolean",
                    example: false,
                  },

                  deletedAt: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                  },

                  createdAt: {
                    type: "string",
                    format: "date-time",
                  },

                  updatedAt: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },

              CreatePickupPartnerRequest: {
                type: "object",
                required: [
                  "name",
                  "whatsapp",
                ],
                properties: {
                  name: {
                    type: "string",
                    example: "ABC Pickup Services",
                  },

                  whatsapp: {
                    type: "string",
                    example: "+919876543210",
                  },
                },
              },

              UpdatePickupPartnerRequest: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "ABC Pickup Services",
                  },

                  whatsapp: {
                    type: "string",
                    example: "+919876543210",
                  },
                },
              },

              UpdatePickupPartnerStatusRequest: {
                type: "object",
                required: ["status"],
                properties: {
                  status: {
                    type: "boolean",
                    example: false,
                  },
                },
              }, format: "password",
              example: "Password@123",
            },
          },
        },

        LoginResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Login successful",
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIs...",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        Fabric: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            name: {
              type: "string",
              example: "Cotton",
            },
            status: {
              type: "boolean",
              example: true,
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateFabricRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Cotton",
            },
          },
        },

        UpdateFabricRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Premium Cotton",
            },
          },
        },

        UpdateFabricStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
          },
        },
        Country: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            name: {
              type: "string",
              example: "India",
            },
            status: {
              type: "boolean",
              example: true,
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateCountryRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "India",
            },
          },
        },

        UpdateCountryRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "United Arab Emirates",
            },
          },
        },

        UpdateCountryStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "65f123456789abcdef123456",
            },
            email: {
              type: "string",
              format: "email",
              example: "admin@example.com",
            },
            role: {
              type: "string",
              enum: ["SuperAdmin", "Admin", "Employee"],
              example: "SuperAdmin",
            },
          },
        },
        DeliveryPartner: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },

            name: {
              type: "string",
              example: "DHL Express",
            },

            whatsapp: {
              type: "string",
              example: "+919876543210",
            },

            from: {
              $ref: "#/components/schemas/Country",
            },

            toCountry: {
              $ref: "#/components/schemas/Country",
            },

            charge: {
              type: "number",
              example: 500,
            },

            status: {
              type: "boolean",
              example: true,
            },

            isDeleted: {
              type: "boolean",
              example: false,
            },

            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateDeliveryPartnerRequest: {
          type: "object",
          required: [
            "name",
            "whatsapp",
            "from",
            "toCountry",
          ],
          properties: {
            name: {
              type: "string",
              example: "DHL Express",
            },

            whatsapp: {
              type: "string",
              example: "+919876543210",
            },

            from: {
              type: "string",
              description: "Country ID",
              example: "665c2f8a9b12345678901234",
            },

            toCountry: {
              type: "string",
              description: "Destination country ID",
              example: "665c2f8a9b12345678901235",
            },

            charge: {
              type: "number",
              example: 500,
            },
          },
        },

        UpdateDeliveryPartnerRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "DHL Express",
            },

            whatsapp: {
              type: "string",
              example: "+919876543210",
            },

            from: {
              type: "string",
              description: "Country ID",
              example: "665c2f8a9b12345678901234",
            },

            toCountry: {
              type: "string",
              description: "Destination country ID",
              example: "665c2f8a9b12345678901235",
            },

            charge: {
              type: "number",
              example: 750,
            },
          },
        },

        UpdateDeliveryPartnerStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
          },
        },
        PickupAssign: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },

            transport: {
              $ref: "#/components/schemas/PickupPartner",
            },

            lrNo: {
              type: "string",
              example: "LR-2026-00125",
            },

            bundleCount: {
              type: "number",
              example: 10,
            },

            amount: {
              type: "number",
              example: 2500,
            },

            paymentStatus: {
              type: "string",
              enum: ["Unpaid", "Paid"],
              example: "Unpaid",
            },

            pickupStatus: {
              type: "string",
              enum: ["Pending", "Collected"],
              example: "Pending",
            },

            collectedBundle: {
              type: "number",
              example: 0,
            },

            status: {
              type: "boolean",
              example: true,
            },

            isDeleted: {
              type: "boolean",
              example: false,
            },

            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreatePickupAssignRequest: {
          type: "object",
          required: [
            "transport",
            "lrNo",
            "bundleCount",
            "amount",
          ],
          properties: {
            transport: {
              type: "string",
              description: "Pickup Partner ID",
              example: "665c2f8a9b12345678901234",
            },

            lrNo: {
              type: "string",
              example: "LR-2026-00125",
            },

            bundleCount: {
              type: "number",
              minimum: 1,
              example: 10,
            },

            amount: {
              type: "number",
              minimum: 0,
              example: 2500,
            },

            paymentStatus: {
              type: "string",
              enum: ["Unpaid", "Paid"],
              example: "Unpaid",
            },

            pickupStatus: {
              type: "string",
              enum: ["Pending", "Collected"],
              example: "Pending",
            },

            collectedBundle: {
              type: "number",
              minimum: 0,
              example: 0,
            },
          },
        },

        UpdatePickupAssignRequest: {
          type: "object",
          properties: {
            transport: {
              type: "string",
              description: "Pickup Partner ID",
              example: "665c2f8a9b12345678901234",
            },

            lrNo: {
              type: "string",
              example: "LR-2026-00125",
            },

            bundleCount: {
              type: "number",
              minimum: 1,
              example: 15,
            },

            amount: {
              type: "number",
              minimum: 0,
              example: 3000,
            },

            paymentStatus: {
              type: "string",
              enum: ["Unpaid", "Paid"],
              example: "Paid",
            },

            pickupStatus: {
              type: "string",
              enum: ["Pending", "Collected"],
              example: "Pending",
            },

            collectedBundle: {
              type: "number",
              minimum: 0,
              example: 5,
            },
          },
        },

        UpdatePickupAssignStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
          },
        },

        UpdatePickupPaymentStatusRequest: {
          type: "object",
          required: ["paymentStatus"],
          properties: {
            paymentStatus: {
              type: "string",
              enum: ["Unpaid", "Paid"],
              example: "Paid",
            },
          },
        },

        MarkPickupCollectedRequest: {
          type: "object",
          required: ["collectedBundle"],
          properties: {
            collectedBundle: {
              type: "number",
              minimum: 0,
              example: 10,
              description:
                "Number of bundles actually collected. Cannot exceed bundleCount.",
            },
          },
        },
        PreBooking: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6ac60a656955d9a90ad2f41c",
            },

            preBookingId: {
              type: "string",
              example: "PBK-0006",
            },

            sender: {
              $ref: "#/components/schemas/Customer",
            },

            phoneNumber: {
              type: "string",
              example: "+919876543210",
            },

            date: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:30:00.000Z",
            },

            bundleCount: {
              type: "number",
              example: 10,
            },

            bundleType: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Bundle",
            },

            preBookingStatus: {
              type: "string",
              enum: ["Pending", "Collected", "Canceled"],
              example: "Collected",
            },

            status: {
              type: "boolean",
              example: true,
            },

            isDeleted: {
              type: "boolean",
              example: false,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreatePreBookingRequest: {
          type: "object",
          required: [
            "sender",
            "phoneNumber",
            "date",
            "bundleCount",
            "bundleType",
          ],
          properties: {
            sender: {
              type: "string",
              description: "Customer ID",
              example: "665c2f8a9b12345678901234",
            },

            phoneNumber: {
              type: "string",
              example: "+919876543210",
            },

            date: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:30:00.000Z",
            },

            bundleCount: {
              type: "number",
              minimum: 1,
              example: 10,
            },

            bundleType: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Bundle",
            },
          },
        },

        UpdatePreBookingRequest: {
          type: "object",
          properties: {
            sender: {
              type: "string",
              description: "Customer ID",
              example: "665c2f8a9b12345678901234",
            },

            phoneNumber: {
              type: "string",
              example: "+919876543210",
            },

            date: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:30:00.000Z",
            },

            bundleCount: {
              type: "number",
              minimum: 1,
              example: 15,
            },

            bundleType: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Box",
            },
          },
        },

        UpdatePreBookingStatusRequest: {
          type: "object",
          required: ["preBookingStatus"],
          properties: {
            preBookingStatus: {
              type: "string",
              enum: ["Pending", "Collected", "Canceled"],
              example: "Collected",
            },
          },
        },
        Booking: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },

            bookingId: {
              type: "string",
              example: "BKG-0001",
            },

            sender: {
              type: "object",
              description: "Populated sender customer",
            },

            receiver: {
              type: "object",
              description: "Populated receiver customer",
            },

            pickupOption: {
              type: "object",
              description: "Populated pickup partner",
            },

            date: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:30:00.000Z",
            },

            billOption: {
              type: "string",
              enum: ["With Bill", "Without Bill"],
              example: "With Bill",
            },

            bundleCount: {
              type: "number",
              example: 12,
            },

            bundleType: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Bundle",
            },

            bundle: {
              type: "number",
              nullable: true,
              example: 12,
              description:
                "Final bundle quantity. Null when packing requires repacking.",
            },

            productType: {
              type: "string",
              enum: ["Branded", "Normal"],
              example: "Branded",
            },

            packingStatus: {
              type: "string",
              enum: ["Ready to Ship", "Repacking Required"],
              example: "Ready to Ship",
            },

            packageListStatus: {
              type: "string",
              enum: ["Added", "Pending"],
              example: "Pending",
            },

            stuffStatus: {
              type: "string",
              enum: ["Pending", "Stuffed"],
              example: "Pending",
            },

            stuffed: {
              type: "boolean",
              example: false,
            },

            sentToStuffing: {
              type: "boolean",
              example: false,
            },

            brandHandlingCharge: {
              type: "number",
              example: 100,
            },

            pickupCharge: {
              type: "number",
              example: 50,
            },

            bundleHandlingCharge: {
              type: "number",
              example: 25,
            },

            status: {
              type: "boolean",
              example: true,
            },

            isDeleted: {
              type: "boolean",
              example: false,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateBookingRequest: {
          type: "object",

          required: [
            "sender",
            "receiver",
            "pickupOption",
            "date",
            "billOption",
            "bundleCount",
            "bundleType",
            "productType",
          ],

          properties: {
            sender: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },

            receiver: {
              type: "string",
              example: "665c2f8a9b12345678901235",
            },

            pickupOption: {
              type: "string",
              example: "665c2f8a9b12345678901236",
            },

            date: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:30:00.000Z",
            },

            billOption: {
              type: "string",
              enum: ["With Bill", "Without Bill"],
              example: "With Bill",
            },

            bundleCount: {
              type: "number",
              minimum: 1,
              example: 12,
            },

            bundleType: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Bundle",
            },

            productType: {
              type: "string",
              enum: ["Branded", "Normal"],
              example: "Branded",
            },

            packingStatus: {
              type: "string",
              enum: ["Ready to Ship", "Repacking Required"],
              example: "Repacking Required",
            },

            packageListStatus: {
              type: "string",
              enum: ["Added", "Pending"],
              example: "Pending",
            },

            stuffStatus: {
              type: "string",
              enum: ["Pending", "Stuffed"],
              example: "Pending",
            },

            stuffed: {
              type: "boolean",
              example: false,
            },

            sentToStuffing: {
              type: "boolean",
              example: false,
            },

            brandHandlingCharge: {
              type: "number",
              minimum: 0,
              example: 100,
            },

            pickupCharge: {
              type: "number",
              minimum: 0,
              example: 50,
            },

            bundleHandlingCharge: {
              type: "number",
              minimum: 0,
              example: 25,
            },
          },
        },

        UpdateBookingRequest: {
          type: "object",

          properties: {
            sender: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },

            receiver: {
              type: "string",
              example: "665c2f8a9b12345678901235",
            },

            pickupOption: {
              type: "string",
              example: "665c2f8a9b12345678901236",
            },

            date: {
              type: "string",
              format: "date-time",
              example: "2026-10-07T10:30:00.000Z",
            },

            billOption: {
              type: "string",
              enum: ["With Bill", "Without Bill"],
            },

            bundleCount: {
              type: "number",
              minimum: 1,
            },

            bundleType: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
            },

            productType: {
              type: "string",
              enum: ["Branded", "Normal"],
            },

            packingStatus: {
              type: "string",
              enum: ["Ready to Ship", "Repacking Required"],
            },

            packageListStatus: {
              type: "string",
              enum: ["Added", "Pending"],
            },

            stuffStatus: {
              type: "string",
              enum: ["Pending", "Stuffed"],
            },

            stuffed: {
              type: "boolean",
            },

            sentToStuffing: {
              type: "boolean",
            },

            brandHandlingCharge: {
              type: "number",
              minimum: 0,
            },

            pickupCharge: {
              type: "number",
              minimum: 0,
            },

            bundleHandlingCharge: {
              type: "number",
              minimum: 0,
            },
          },
        },

        UpdateBookingStatusRequest: {
          type: "object",

          required: ["status"],

          properties: {
            status: {
              type: "boolean",
              example: true,
            },
          },
        },

        UpdatePackageListStatusRequest: {

          type: "object",

          required: ["packageListStatus"],

          properties: {
            packageListStatus: {
              type: "string",
              enum: ["Added", "Pending"],
              example: "Added",
            },
          },
        },

        UpdateStuffStatusRequest: {
          type: "object",

          required: ["stuffStatus"],

          properties: {
            stuffStatus: {
              type: "string",
              enum: ["Pending", "Stuffed"],
              example: "Stuffed",
            },
          },
        },
        // =========================
        // EMPLOYEE
        // =========================

        PackageProduct: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6ac5cc549c7d9b82ddfd8bc9",
            },

            product: {
              type: "object",
              description: "Populated product",
              properties: {
                _id: {
                  type: "string",
                  example: "6ac5cc549c7d9b82ddfd8bc6",
                },
                name: {
                  type: "string",
                  example: "MENS T SHIRT",
                },
              },
            },

            quantity: {
              type: "number",
              example: 10,
            },

            fabric: {
              type: "object",
              nullable: true,
              description: "Populated fabric",
              properties: {
                _id: {
                  type: "string",
                  example: "6ac5cc619c7d9b82ddfd8bc7",
                },
                name: {
                  type: "string",
                  example: "Cotton",
                },
              },
            },

            description: {
              type: "string",
              nullable: true,
              example: "Cotton shirts",
            },
          },
        },

        PackageBundle: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6ac5cc549c7d9b82ddfd8bc9",
            },

            bundleNo: {
              type: "number",
              example: 1,
            },

            netWeight: {
              type: "number",
              example: 20,
            },

            grossWeight: {
              type: "number",
              example: 22,
            },

            products: {
              type: "array",
              items: {
                $ref: "#/components/schemas/PackageProduct",
              },
            },
          },
        },

        Package: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "65f123456789abcdef123456",
            },

            booking: {
              type: "object",
              description: "Populated booking",
              properties: {
                _id: {
                  type: "string",
                  example: "65f123456789abcdef123456",
                },

                bookingId: {
                  type: "string",
                  example: "BKG-0034",
                },

                date: {
                  type: "string",
                  format: "date-time",
                  example: "2026-10-08T00:00:00.000Z",
                },

                sender: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "65f123456789abcdef123401",
                    },

                    name: {
                      type: "string",
                      example: "Muthu",
                    },

                    whatsapp: {
                      type: "string",
                      example: "+919876543210",
                    },

                    alternativeNo: {
                      type: "string",
                      nullable: true,
                      example: "+919876543211",
                    },

                    country: {
                      type: "string",
                      example: "India",
                    },

                    location: {
                      type: "string",
                      example: "Kerala",
                    },
                  },
                },

                receiver: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "65f123456789abcdef123402",
                    },

                    name: {
                      type: "string",
                      example: "AL SLATER RAHEEM",
                    },

                    whatsapp: {
                      type: "string",
                      example: "+97338392623",
                    },

                    alternativeNo: {
                      type: "string",
                      nullable: true,
                    },

                    country: {
                      type: "string",
                      example: "BAHRAIN",
                    },

                    location: {
                      type: "string",
                      nullable: true,
                    },
                  },
                },

                pickupOption: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "65f123456789abcdef123403",
                    },

                    name: {
                      type: "string",
                      example: "Pickup Partner",
                    },

                    whatsapp: {
                      type: "string",
                      example: "+919876543210",
                    },
                  },
                },
              },
            },
            repackedBy: {
              type: "string",
              description: "Name of the person who repacked the package",
              example: "John",
            },
            bundles: {
              type: "array",
              items: {
                $ref: "#/components/schemas/PackageBundle",
              },
            },

            status: {
              type: "boolean",
              example: true,
            },

            isDeleted: {
              type: "boolean",
              example: false,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreatePackageRequest: {
          type: "object",

          required: [
            "booking",
            "bundles",
          ],

          properties: {
            booking: {
              type: "string",
              description: "Booking ObjectId",
              example: "65f123456789abcdef123456",
            },

            repackedBy: {
              type: "string",
              description: "Name of the person who repacked the package",
              example: "John",
            },

            bundles: {
              type: "array",

              items: {
                type: "object",

                required: [
                  "bundleNo",
                  "products",
                ],

                properties: {
                  bundleNo: {
                    type: "number",
                    example: 1,
                  },

                  netWeight: {
                    type: "number",
                    example: 20,
                  },

                  grossWeight: {
                    type: "number",
                    example: 22,
                  },

                  products: {
                    type: "array",

                    items: {
                      type: "object",

                      required: [
                        "product",
                        "quantity",
                      ],

                      properties: {
                        product: {
                          type: "string",
                          example: "6ac5cc549c7d9b82ddfd8bc6",
                        },

                        quantity: {
                          type: "number",
                          example: 10,
                        },

                        fabric: {
                          type: "string",
                          nullable: true,
                          example: "6ac5cc619c7d9b82ddfd8bc7",
                        },

                        description: {
                          type: "string",
                          nullable: true,
                          example: "Cotton shirts",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        UpdatePackageRequest: {
          type: "object",

          properties: {
            booking: {
              type: "string",
              description: "Booking ObjectId",
              example: "65f123456789abcdef123456",
            },

            repackedBy: {
              type: "string",
              description: "Name of the person who repacked the package",
              example: "John",
            },

            bundles: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  bundleNo: {
                    type: "number",
                    example: 1,
                  },

                  netWeight: {
                    type: "number",
                    example: 20,
                  },

                  grossWeight: {
                    type: "number",
                    example: 22,
                  },

                  products: {
                    type: "array",

                    items: {
                      type: "object",

                      properties: {
                        product: {
                          type: "string",
                          example: "6ac5cc549c7d9b82ddfd8bc6",
                        },

                        quantity: {
                          type: "number",
                          example: 10,
                        },

                        fabric: {
                          type: "string",
                          nullable: true,
                          example: "6ac5cc619c7d9b82ddfd8bc7",
                        },

                        description: {
                          type: "string",
                          nullable: true,
                          example: "Cotton shirts",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        PickupPartner: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },

            name: {
              type: "string",
              example: "ABC Pickup Services",
            },

            whatsapp: {
              type: "string",
              example: "+919876543210",
            },

            status: {
              type: "boolean",
              example: true,
            },

            isDeleted: {
              type: "boolean",
              example: false,
            },

            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreatePickupPartnerRequest: {
          type: "object",
          required: [
            "name",
            "whatsapp",
          ],
          properties: {
            name: {
              type: "string",
              example: "ABC Pickup Services",
            },

            whatsapp: {
              type: "string",
              example: "+919876543210",
            },
          },
        },

        UpdatePickupPartnerRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "ABC Pickup Services",
            },

            whatsapp: {
              type: "string",
              example: "+919876543210",
            },
          },
        },

        UpdatePickupPartnerStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
          },
        },
        Employee: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            empId: {
              type: "string",
              example: "EMP001",
            },
            contact: {
              type: "string",
              example: "9876543210",
            },
            bloodGroup: {
              type: "string",
              example: "O+",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["SuperAdmin", "Admin", "Employee"],
              example: "Employee",
            },
            status: {
              type: "boolean",
              example: true,
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateEmployeeRequest: {
          type: "object",
          required: [
            "name",
            "empId",
            "contact",
            "email",
            "password",
          ],
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            empId: {
              type: "string",
              example: "EMP001",
            },
            contact: {
              type: "string",
              example: "9876543210",
            },
            bloodGroup: {
              type: "string",
              example: "O+",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password@123",
            },
            role: {
              type: "string",
              enum: ["SuperAdmin", "Admin", "Employee"],
              example: "Employee",
            },
          },
        },

        UpdateEmployeeRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            empId: {
              type: "string",
              example: "EMP001",
            },
            contact: {
              type: "string",
              example: "9876543210",
            },
            bloodGroup: {
              type: "string",
              example: "O+",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "NewPassword@123",
            },
            role: {
              type: "string",
              enum: ["SuperAdmin", "Admin", "Employee"],
              example: "Employee",
            },
          },
        },

        UpdateEmployeeStatusRequest: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: true,
            },
          },
        },
        Store: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            location: {
              type: "string",
              example: "Kochi",
            },
            contact: {
              type: "string",
              example: "+91 9876543210",
            },
            inCharge: {
              type: "string",
              example: "John Doe",
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Active",
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateStoreRequest: {
          type: "object",
          required: ["location", "contact", "inCharge"],
          properties: {
            location: {
              type: "string",
              example: "Kochi",
            },
            contact: {
              type: "string",
              example: "+91 9876543210",
            },
            inCharge: {
              type: "string",
              example: "John Doe",
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              default: "Active",
              example: "Active",
            },
          },
        },

        UpdateStoreRequest: {
          type: "object",
          properties: {
            location: {
              type: "string",
              example: "Dubai",
            },
            contact: {
              type: "string",
              example: "+971 501234567",
            },
            inCharge: {
              type: "string",
              example: "John Doe",
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Active",
            },
          },
        },

        UpdateStoreStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Inactive",
            },
          },
        },
        Pricing: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            from: {
              type: "string",
              example: "India",
            },
            to: {
              type: "string",
              example: "UAE",
            },
            uom: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Bundle",
            },
            price: {
              type: "number",
              example: 500,
            },
            status: {
              type: "boolean",
              example: true,
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreatePricingRequest: {
          type: "object",
          required: ["from", "to", "uom", "price"],
          properties: {
            from: {
              type: "string",
              example: "India",
            },
            to: {
              type: "string",
              example: "UAE",
            },
            uom: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "Bundle",
            },
            price: {
              type: "number",
              example: 500,
            },
          },
        },

        UpdatePricingRequest: {
          type: "object",
          properties: {
            from: {
              type: "string",
              example: "India",
            },
            to: {
              type: "string",
              example: "UAE",
            },
            uom: {
              type: "string",
              enum: ["Bundle", "Box", "CBM", "KG"],
              example: "KG",
            },
            price: {
              type: "number",
              example: 750,
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            name: {
              type: "string",
              example: "Electronics",
            },
            status: {
              type: "boolean",
              example: true,
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateProductRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "Electronics",
            },
          },
        },

        UpdateProductRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Mobile Accessories",
            },
          },
        },

        UpdateProductStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
          },
        },

        Customer: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "665c2f8a9b12345678901234",
            },
            customerType: {
              type: "string",
              enum: ["Sender", "Receiver"],
              example: "Sender",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            whatsapp: {
              type: "string",
              example: "9876543210",
            },
            alternativeNo: {
              type: "string",
              example: "9123456780",
            },
            country: {
              type: "string",
              example: "India",
            },
            location: {
              type: "string",
              example: "Kochi",
            },
            discount: {
              type: "number",
              example: 10,
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Active",
            },
            isDeleted: {
              type: "boolean",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        CreateCustomerRequest: {
          type: "object",
          properties: {
            customerType: {
              type: "string",
              enum: ["Sender", "Receiver"],
              example: "Sender",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            whatsapp: {
              type: "string",
              example: "9876543210",
            },
            alternativeNo: {
              type: "string",
              example: "9123456780",
            },
            country: {
              type: "string",
              example: "India",
            },
            location: {
              type: "string",
              example: "Kochi",
            },
            discount: {
              type: "number",
              example: 10,
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Active",
            },
          },
        },

        UpdateCustomerRequest: {
          type: "object",
          properties: {
            customerType: {
              type: "string",
              enum: ["Sender", "Receiver"],
              example: "Receiver",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            whatsapp: {
              type: "string",
              example: "9876543210",
            },
            alternativeNo: {
              type: "string",
              example: "9123456780",
            },
            country: {
              type: "string",
              example: "UAE",
            },
            location: {
              type: "string",
              example: "Dubai",
            },
            discount: {
              type: "number",
              example: 10,
            },
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Active",
            },
          },
        },

        UpdateCustomerStatusRequest: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["Active", "Inactive"],
              example: "Active",
            },
          },
        },
      },
    },
  },

  apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;