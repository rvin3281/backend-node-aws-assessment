const { Sequelize } = require("sequelize");

const dbConfig = {
  host:
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_HOST
      : process.env.RDS_HOSTNAME,
  user:
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_USER
      : process.env.RDS_USERNAME,
  database:
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE
      : process.env.RDS_DB_NAME,
  password:
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_PASSWORD
      : process.env.RDS_PASSWORD,
  dialect: "mysql",
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    // operatorsAliases: false, // Deprecated
  }
);

/** TEST CONNECTION */
const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection has been established successfully on ${process.env.NODE_ENV}`
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

authenticate();

module.exports = sequelize;
