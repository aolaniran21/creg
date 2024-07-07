import "reflect-metadata";
import { sequelize } from "./../../sequelize.config";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";

class AdminUser extends Model {
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
AdminUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      field: "id",
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "username",
      //unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: true,
      field: "gender",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone",
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
      allowNull: false,
      unique: true,
    },
    role: { type: DataTypes.ENUM("ADMIN", "SUPER ADMIN", "WEB MASTER") },
    verification_token: {
      type: DataTypes.STRING,
      field: "verification_token",
      allowNull: true,
    },
    verification_token_expiration: {
      type: DataTypes.DATE,
      field: "verification_token_expiration",
      allowNull: true,
    },
    reset_token: {
      type: DataTypes.STRING,
      field: "reset_token",
      allowNull: true,
    },
    reset_token_expiration: {
      type: DataTypes.DATE,
      field: "reset_token",
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      field: "is_verified",
      allowNull: true,
    },

    createdAt: { type: DataTypes.DATEONLY, field: "created_at" },
    updatedAt: { type: DataTypes.DATEONLY, field: "updated_at" },
  },
  {
    sequelize,
    modelName: "AdminUser",
    tableName: "admin_users",
  }
);

AdminUser.beforeSave((admin_user: Model) => {
  const changedFields = admin_user.changed();
  if (changedFields) {
    if (changedFields.includes("password")) {
      admin_user.setDataValue(
        "password",
        bcrypt.hashSync(
          admin_user.getDataValue("password"),
          bcrypt.genSaltSync(10)
        )
      );
    }
  }
});

export default AdminUser;
