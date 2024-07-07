import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../sequelize.config";
import { Type } from "./review.enum";
import Project from "../project/project.entity";

class Review extends Model { public Type!: 'PROJECT' | 'ORGANIZATION'; }

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      field: "id",
    },
    TypeID: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "type_id",
    },
    Type: {
      type: DataTypes.ENUM(
        "PROJECT",
        "ORGANIZATION",
      ),
      allowNull: false,
      field: "type",
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "description",
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
  { sequelize, modelName: "Review", tableName: "reviews" }
);

// Review.addHook('beforeCreate', (review, options) => {
//   if (!['PROJECT', 'ORGANIZATION'].includes(review.Type)) {
//     throw new Error('Invalid reviewable type');
//   }
// });

export default Review;
