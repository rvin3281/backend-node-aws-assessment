const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const sequelize = require("./database/database");
const app = require("./app");
const http = require("http");

const port = process.env.NODE_ENV === "development" ? 5000 : process.env.PORT;

const startServer = () => {
  const server = http.createServer(app); // Create an HTTP server using Express app.

  server.listen(port, () => {
    console.log(`App running on port ${port}`);
  });

  server.on("error", (error) => {
    console.error("Server startup error:", error);
    process.exit(1);
  });
};

const authenticate = async () => {
  try {
    await sequelize.authenticate();
    startServer();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

authenticate();

// sequelize.sync({ alter: true }).then(() => {
//   console.log("Done Sync");
// });
