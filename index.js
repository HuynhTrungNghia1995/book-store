const express = require("express");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { bookRoutes, userRoutes, reviewRoutes } = require("./routes");
const { verifyUser } = require("./middlewares/auth");

const app = express();

app.use(
  session({ secret: "fingerpint" }, (resave = true), (saveUninitialized = true))
);

app.use(express.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Book Store",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to authenticate requests to "/friends" endpoint
app.use("/api/reviews", verifyUser);
app.use("/api/reviews", reviewRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
