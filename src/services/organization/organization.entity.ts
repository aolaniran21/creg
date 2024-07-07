import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize.config";
import { OrgType, RoleInOrganization, OrgStatus, OrgApproval } from "./org.enum";
import Project from "../project/project.entity";

class Organization extends Model { }

Organization.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      field: "id",
    },
    UserID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    OrgType: {
      type: DataTypes.ENUM(
        "GENERAL_ORGANIZATION",
        "PROJECT_PROPONENT",
        "PROJECT_DEVELOPER",
        "MARKET_PARTICIPANT",
        "OTHER"
      ),
      allowNull: false,
      field: "org_type",
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    RegNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "reg_no",
    },
    Industry: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "industry",
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "address",
    },
    LGA: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lga",
    },
    ZipPostCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "zip_post_code",
    },
    Website: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "website",
    },
    People: {
      type: DataTypes.JSON, // Store as JSON in the database
      allowNull: false,
      field: "people",
      get() {
        const value = this.getDataValue("People");
        return value ? JSON.parse(value) : []; // Parse the stored JSON string into an array
      },
      set(value) {
        this.setDataValue("People", JSON.stringify(value)); // Convert the array to a JSON string before storing
      },
    },
    OrgLogo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "org_logo",
    },
    Status: {
      type: DataTypes.ENUM(OrgStatus.ACTIVATED, OrgStatus.DEACTIVATED),
      allowNull: false,
      field: "status",
    },
    IsPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_public",
    },
    OrgApproval: {
      type: DataTypes.ENUM(OrgApproval.ACCEPTED, OrgApproval.REJECTED, OrgApproval.PENDING),
      allowNull: false,
      field: "approval",
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      field: "updatedAt",
    },
  },
  { sequelize, modelName: "Organization", tableName: "organizations" }
);

Organization.hasMany(Project, {
  as: "organization_projects",
  foreignKey: "org_id",
  sourceKey: "id",
});

Project.belongsTo(Organization, { foreignKey: "org_id", as: "organizations" });

export default Organization;
