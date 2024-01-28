import { Sequelize } from "sequelize";

export interface DBConnectionInterface {
  connection(): Sequelize;
}

export class PostgresConection implements DBConnectionInterface {
  public connection(): Sequelize {
    const sequelize = new Sequelize(
      process.env.DB_DATABASE || "",
      process.env.DB_USERNAME || "",
      process.env.DB_PASSWORD || "",
      {
        host: process.env.DB_HOST || "",
        port: parseInt(process.env.DB_PORT || ""),
        dialect: "postgres",
        define: {
          timestamps: false,
        },
      }
    );

    return sequelize;
  }
}
