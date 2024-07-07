import "reflect-metadata";
import { sequelize } from "./../../sequelize.config";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { UserRoles } from "../users/user.enum";

class Credential extends Model {
  public async compareUserPassword(
    candidatePassword: string
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.getDataValue("password"));
  }

  public async updatePassword(newPassword: string): Promise<boolean> {
    try {
      await this.update({ password: newPassword });

      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  }
}

Credential.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      field: "id",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email",
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "password",
    },
    is_google: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_google",
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_verified",
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "verification_token",
    },
    verification_token_expiration: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "verification_token_expiration",
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "reset_token",
    },
    reset_token_expiration: {
      type: DataTypes.STRING,

      allowNull: true,
      field: "reset_token_expiration",
    },
    user_role: {
      type: DataTypes.ENUM(
        UserRoles.ADMIN,
        UserRoles.MEMBER,
        UserRoles.SUPERADMIN,
        UserRoles.WEBMASTER
      ),
      allowNull: false,
      field: "user_role",
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
  { sequelize, modelName: "Credential", tableName: "credentials" }
);

Credential.beforeSave((user: Model) => {
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

export default Credential;
