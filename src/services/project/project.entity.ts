import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize.config";
import { ProjectStatus, ProjectType, GHGProgram, ProjectApproval } from "./project.enum";

class Project extends Model { }

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      field: "id",
    },
    OrgID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "org_id",
    },
    Headline: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "headline",
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "name",
    },
    ShortDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "description",
    },
    LGA: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "lga",
    },
    IsGroupProject: {
      type: DataTypes.BOOLEAN,
      field: "is_group_project",
    },
    IsPublic: {
      type: DataTypes.BOOLEAN,
      field: "is_public",
      defaultValue: false,
    },
    Website: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "website",
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "image",
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      field: "start_date",
    },
    ProjectType: {
      type: DataTypes.ENUM(ProjectType.NEW_PROJECT, ProjectType.TRANSITION),
      allowNull: false,
      field: "type",
    },
    GHGProgram: {
      type: DataTypes.ENUM(GHGProgram.LASEPA, GHGProgram.FOREST_CARBON_CODE),
      allowNull: false,
      field: "ghg_program",
    },
    Sector: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "sector",
    },
    ProjectStatus: {
      type: DataTypes.ENUM(
        ProjectStatus.DRAFT,
        ProjectStatus.CONCEPT,
        ProjectStatus.DEVELOPMENT,
        ProjectStatus.VALIDATION,
        ProjectStatus.VALIDATED
      ),
      field: "status",
    },
    ProjectApproval: {
      type: DataTypes.ENUM(
        ProjectApproval.ACCEPTED,
        ProjectApproval.REJECTED,
        ProjectApproval.PENDING,

      ),
      field: "approval",
    },
  },
  { sequelize, modelName: "Project", tableName: "projects" }
);

export default Project;
