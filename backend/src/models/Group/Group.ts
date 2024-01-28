import { DB } from "@global";
import { DataTypes as DT, Model } from "sequelize";

export default class Group extends Model {
  declare id: number;
  declare name: string;
  declare createDate: Date;
  declare isPersonal: boolean;
  declare description: string;
  protected groupMembers: Array<GroupMembers> = [];
}

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

class GroupMembers extends Model {
  declare idUser: number;
  declare idGroup: number;
  declare level: number;
}

GroupMembers.init(
  {
    idUser: {
      field: "id_user",
      type: DT.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    idGroup: {
      field: "id_group",
      type: DT.INTEGER,
      allowNull: false,
      references: {
        model: "groups",
        key: "id",
      },
    },
    level: {
      type: DT.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: DB,
    modelName: "group_members",
  }
);
