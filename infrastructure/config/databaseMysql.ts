import { Sequelize } from "sequelize-typescript";
import UserModel from "../../adapters/repositories/daos/userModel";
require('dotenv').config();
import 'reflect-metadata';
class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    const ENV = process.env;
    let config: any;
    if (ENV.NODE_ENV === 'test') {
      config = {
        dialect: 'sqlite',
        storage: 'sqlite::memory',
        logging: true,
        models: [UserModel]
      }
    } else {
      config = {
        database: ENV.DB_NAME,
        host: ENV.DB_HOST,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
        dialect: 'mysql',
        logging: true,
        models: [UserModel]
      }
    }
    this.sequelize = new Sequelize(config);

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;