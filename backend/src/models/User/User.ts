import { DB } from "@global";
import { DataTypes as DT, Model } from "sequelize";

export default class User extends Model {
  declare id: number;
  declare name: string;
  declare login: string;
  declare password: string;
  declare email: string;
  declare monthlyIncome: number;
  declare already_in: boolean;
  declare is_actve: boolean;
}

User.init(
  {
    id: {
      type: DT.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DT.STRING,
    login: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DT.CHAR(60),
      allowNull: false,
    },
    email: DT.STRING,
    monthlyIncome: {
      type: DT.FLOAT,
      field: "monthly_income",
    },
    alreadyIn: {
      field: "already_in",
      type: DT.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isActve: {
      field: "is_actve",
      type: DT.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize: DB,
    modelName: "users",
  }
);
