import "reflect-metadata";
import { sequelize } from "./../../sequelize.config";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { MaritalStatus, GenderEnum } from "./user.enum";
import Organization from "../../services/organization/organization.entity";
import Credential from "./credential.entity";

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      field: "id",
    },
    credential_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "credential_id",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "last_name",
    },
    middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "middle_name",
    },
    gender: {
      type: DataTypes.ENUM(GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.NONE),
      allowNull: false,
      field: "gender",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone",
    },
    photo_image: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "photo_image",
    },
    citizenship: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "citizenship",
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      field: "updated_at",
    },
  },
  { sequelize, modelName: "User", tableName: "users" }
);

User.hasMany(Organization, {
  foreignKey: "UserID",
  sourceKey: "id",
  as: "UserOrg",
});

Organization.belongsTo(User, {
  foreignKey: "UserID",
  as: "UserOrg",
});

Credential.hasOne(User, {
  foreignKey: "credential_id",
  sourceKey: "id",
  as: "CreduserAssoc",
});

User.hasOne(Credential, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "userCredAssoc",
});

// Credential.belongsTo(User, {
//   foreignKey: "credential_id",
//   as: "userAssoc",
// });

// User.belongsTo(Credential, {
//   foreignKey: "credential_id",
//   as: "userAssoc",
// });

User.beforeSave((user: Model) => {
  const changedFields = user.changed();
  if (changedFields) {
    if (changedFields.includes("password")) {
      user.setDataValue(
        "password",
        bcrypt.hashSync(user.getDataValue("password"), bcrypt.genSaltSync(10))
      );
    }
  }
});

export default User;
