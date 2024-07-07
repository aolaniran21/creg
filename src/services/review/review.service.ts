import Review from "./review.entity";
import Project from "../project/project.entity";
import User from "../../entity/users/user.entity";
import { sequelize } from "../../sequelize.config";
import { Op } from "sequelize";

import {
  CreateReview,
  UpdateReview,
} from "./review.interface";
import Organization from "../organization/organization.entity";

export class ReviewService {
  public async createReview(
    reviewData: CreateReview,
  ): Promise<Review> {
    const t = await sequelize.transaction();
    // Check if the UserID exists in the User table
    if (reviewData.Type == "PROJECT") {
      const projExists = await Project.findByPk(reviewData.TypeID);
      if (!projExists) {
        throw new Error("Project does not exist");
      }
      const updateData = {
        ProjectApproval: reviewData.Approval
      };

      const updatedProject = await projExists.update(updateData);
    }
    if (reviewData.Type == "ORGANIZATION") {
      const orgExists = await Organization.findByPk(reviewData.TypeID);
      if (!orgExists) {
        throw new Error("Organization does not exist");
      }
      const updateData = {
        OrgApproval: reviewData.Approval
      };

      const updatedOrganization = await orgExists.update(updateData);
    }
    try {
      const newData = {
        ...reviewData,
      };
      // console.log(organizationData);
      const review = await Review.create(newData);
      await t.commit();

      return review;
    } catch (error) {
      await t.rollback();

      throw new Error("Unable to create review: " + error.message);
    }
  }

  public async updateReview(
    reviewId: string,
    reviewData: UpdateReview,
  ): Promise<Review> {
    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        throw new Error("Review not found");
      }
      if (review.dataValues.Status == "DEACTIVATED") {
        throw new Error("Review is deactivated");
      }
      // Exclude UserID and Name from the update operation
      const { ...updateData } = reviewData;

      // Update the organization with the remaining fields
      const updatedReview = await review.update(updateData);
      return updatedReview;
    } catch (error) {
      throw new Error("Unable to update review: " + error.message);
    }
  }


  public async listReviews(typeId: string, type: string): Promise<any> {
    try {
      const review = await Review.findAll({
        where: {
          type_id: typeId,
          type: type,
        },
      });

      if (!review) {
        throw new Error("Review not found");
      }

      return review;
    } catch (error) {
      throw new Error("Unable to find review: " + error.message);
    }
  }
  public async listReview(typeId: string, type: string, revivewId: string): Promise<any> {
    try {
      const review = await Review.findAll({
        where: {
          type_id: typeId,
          type: type,
          id: revivewId
        },
      });

      if (!review) {
        throw new Error("Review not found");
      }

      return review;
    } catch (error) {
      throw new Error("Unable to find review: " + error.message);
    }
  }

  public async userListReview(userId: string): Promise<any> {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Organization,
            as: 'UserOrg',
            required: false, // Ensure the user is associated with an organization
            where: {
              OrgApproval: {
                [Op.ne]: 'PENDING' // Ensure the organization's approval is not pending
              }
            },
            include: [
              {
                model: Project,
                as: 'organization_projects',
                required: false, // Projects are not mandatory
                where: {
                  ProjectApproval: {
                    [Op.ne]: 'PENDING' // Ensure the organization's approval is not pending
                  }
                },
              }
            ]
          }
        ]
      });

      if (!user) {
        throw new Error("User not found");
      }

      const organizations = user.dataValues.UserOrg;
      const organizationReviews = await Promise.all(
        organizations.map(async (org) => {
          console.log(org.organization_projects);

          const orgReviews = await Review.findAll({
            where: {
              type_id: org.id,
              type: 'ORGANIZATION'
            }
          });
          // console.log(orgReviews);
          const projectReviews = await Promise.all(
            org.organization_projects.map(async (project) => {
              const reviews = await Review.findAll({
                where: {
                  type_id: project.id,
                  type: 'PROJECT'
                }
              });
              return {
                project: project,
                reviews: reviews
              };
            })
          );

          return {
            organization: org,
            orgReviews: orgReviews,
            projectReviews: projectReviews
          };
        })
      );

      return organizationReviews;
    } catch (error) {
      throw new Error("Unable to find user: " + error.message);
    }
  }
  public async pendingReview(
    TypeId: string,
    Type: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<any> {
    try {
      // console.log(OrgId);
      const options: any = {};
      // if (TypeId) {
      //   options.where = { id: TypeId, status: "PENDING" };
      // }

      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;
      let result
      if (Type == "ORGANIZATION") {
        if (TypeId) {
          options.where = { id: TypeId, OrgApproval: "PENDING" };
        } else {
          options.where = { OrgApproval: "PENDING" };

        }
        result = await Organization.findAll(options);
      }
      if (Type == "PROJECT") {
        if (TypeId) {
          options.where = { id: TypeId, ProjectApproval: "PENDING" };
        } else {
          options.where = { ProjectApproval: "PENDING" };

        }
        result = await Project.findAll(options);
      }
      // organization.forEach((project) => {
      //   project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      // });


      return result;
    } catch (error) {
      throw new Error("Unable to find projects: " + error.message);
    }
  }
}
