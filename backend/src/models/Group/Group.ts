import { DB } from "@global";
import { DataTypes as DT, Model } from "sequelize";
import GroupMembers from "./GroupMembers";

// Model
export default class Group extends Model {
  declare id: number;
  declare name: string;
  declare createDate: Date;
  declare isPersonal: boolean;
  declare description: string;
  declare groupMembers: Array<GroupMembers>;
}

// Scheme
Group.init(
  {
    id: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DT.STRING,
      allowNull: false,
    },
    createDate: {
      type: DT.DATEONLY,
      field: "create_date",
      allowNull: false,
    },
    isPersonal: {
      type: DT.BOOLEAN,
      field: "is_personal",
      allowNull: false,
      defaultValue: false,
    },
    description: DT.STRING,
  },
  {
    sequelize: DB,
    modelName: "groups",
  }
);
