const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const corsOptions = {
//   origin: "https://d2xufxl9u496r3.cloudfront.net/", // Replace with your frontend's URL
//   methods: "GET,POST,PATCH,DELETE,PUT", // Specify the allowed HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Specify the allowed headers
// };

// app.use(cors(corsOptions));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

module.exports = app;
