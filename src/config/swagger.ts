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
              format: "password",
              example: "Password@123",
            },
          },
        },

        User: {
          type: "object",
          properties: {
            _id: {
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
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },

            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },

        // =========================
        // EMPLOYEE
        // =========================

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
              example: "2026-10-06T10:00:00.000Z",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-10-06T10:00:00.000Z",
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
              enum: ["Admin", "Employee"],
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
              example: "Password@123",
            },

            role: {
              type: "string",
              enum: ["Admin", "Employee"],
              example: "Employee",
            },
          },
        },

        UpdateEmployeeStatusRequest: {
          type: "object",
          required: ["status"],
          properties: {
            status: {
              type: "boolean",
              example: true,
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