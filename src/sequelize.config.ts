import "dotenv/config";

const Sequelize = require("sequelize");

const { POSTGRES_DB_URI } = process.env;

export const sequelize = new Sequelize(POSTGRES_DB_URI, {
  dialect: "postgres",
});

const dbConnection = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection has been successfully established.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};

export default dbConnection;
