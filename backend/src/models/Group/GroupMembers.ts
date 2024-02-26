import { DB } from "@global";
import { DataTypes as DT, Model } from "sequelize";

import User from "../User/User";
import Group from "./Group";

// Model
export default class GroupMembers extends Model {
  declare userId: number;
  declare groupId: number;
  declare level: number;
}

// Scheme
GroupMembers.init(
  {
    level: {
      type: DT.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      field: "id_user",
      type: DT.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    groupId: {
      field: "id_group",
      type: DT.INTEGER,
      allowNull: false,
      references: {
        model: "groups",
        key: "id",
      },
    },
  },
  {
    sequelize: DB,
    timestamps: false,
    modelName: "group_members",
  }
);

// Relationships
User.hasMany(GroupMembers, { foreignKey: "userId" });
Group.hasMany(GroupMembers, { foreignKey: "groupId", as: "groupMembers" });
