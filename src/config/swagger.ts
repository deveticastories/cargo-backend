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
              enum: ["SuperAdmin", "Admin"],
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

            data: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIs...",
                },

                user: {
                  $ref: "#/components/schemas/User",
                },
              },
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