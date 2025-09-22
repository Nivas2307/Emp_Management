const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const employeeRoutes = require("./route/employeeRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
const app = express();

// & Middlewares
// ~ Allow requests from any localhost port 
app.use(
  cors({
    origin: ["http://localhost:5174","http://localhost:5176"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// ^Serve uploads
app.use("/uploads", express.static("uploads"));

//* Routes
app.use("/api/employees", employeeRoutes);

// !Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
