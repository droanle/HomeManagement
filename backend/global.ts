import { PostgresConection } from "@/config/db";
import { Sequelize } from "sequelize";

export const DB: Sequelize = new PostgresConection().connection();
