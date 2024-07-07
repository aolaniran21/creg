import { sequelize } from "./../../sequelize.config";
import { DataTypes, Model } from "sequelize";

class Email extends Model {}

Email.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "slug",
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "subject",
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "tag",
    },
    html: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "html",
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
  { sequelize, modelName: "Email", tableName: "emails" }
);

export default Email;
