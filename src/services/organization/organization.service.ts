import Organization from "./organization.entity";
import Project from "../project/project.entity";
import User from "../../entity/users/user.entity";
import { sequelize } from "../../sequelize.config";

import {
  CreateOrganization,
  UpdateOrganization,
} from "./organization.interface";

export class OrganizationService {
  public async createOrganization(
    organizationData: CreateOrganization
  ): Promise<Organization> {
    // Check if the UserID exists in the User table
    const userExists = await User.findByPk(organizationData.UserID);
    if (!userExists) {
      throw new Error("User does not exist");
    }

    try {
      const newData = {
        ...organizationData,
      };
      console.log(organizationData);
      const organization = await Organization.create(newData);
      return organization;
    } catch (error) {
      throw new Error("Unable to create organization: " + error.message);
    }
  }

  public async updateOrganization(
    organizationId: string,
    organizationData: UpdateOrganization
  ): Promise<Organization> {
    try {
      const organization = await Organization.findByPk(organizationId);
      if (!organization) {
        throw new Error("Organization not found");
      }
      if (organization.dataValues.Status == "DEACTIVATED") {
        throw new Error("Organization is deactivated");
      }
      // Exclude UserID and Name from the update operation
      const { ...updateData } = organizationData;

      // Update the organization with the remaining fields
      const updatedOrganization = await organization.update(updateData);
      return updatedOrganization;
    } catch (error) {
      throw new Error("Unable to update organization: " + error.message);
    }
  }

  public async listOrganization(userId: string): Promise<any> {
    try {

      let where = {};
      console.log(userId)

      console.log(where)

      if (userId != "ADMIN") {
        where = { user_id: userId };
      }
      console.log(where)
      const organization = await Organization.findAll({
        where: where,
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*)
                FROM "projects" AS "Proj"
                WHERE
                  "Proj"."org_id" = "organization_projects"."id"
              )`),
              'projectCount'
            ]
          ]
        },
        include: [
          {
            model: Project,
            as: "organization_projects",
            attributes: []
          }
        ],
      });

      if (!organization) {
        throw new Error("Organization not found");
      }

      return organization;
    } catch (error) {
      throw new Error("Unable to find organization: " + error.message);
    }
  }
  public async missingOrgDetails(userId: string): Promise<any> {
    try {
      const organization = await Organization.findAll({
        where: {
          user_id: userId,
          OrgApproval: "REJECTED"
        },
      });

      if (!organization) {
        throw new Error("Organization not found");
      }
      // let missingOrg: any[] = []
      // // console.log(organization)

      // for (const org of organization) {

      //   let missing = false;
      //   console.log(org.dataValues)
      //   for (const prop in org.dataValues) {
      //     // console.log(prop)

      //     if (org[prop] == "" || org[prop] == null || org[prop] == undefined) {
      //       console.log(prop)
      //       missing = true;
      //       break;
      //     }
      //   }

      //   if (missing) {
      //     missingOrg.push(org);
      //   }
      // }
      return organization;
    } catch (error) {
      throw new Error("Unable to find organization: " + error.message);
    }
  }

  public async pendingOrg(
    UserId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<any> {
    try {
      // console.log(OrgId);
      const options: any = {};
      if (UserId) {
        options.where = { user_id: UserId, OrgApproval: "PENDING" };
      }

      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;

      const organization = await Organization.findAll(options);
      // organization.forEach((project) => {
      //   project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      // });


      return organization;
    } catch (error) {
      throw new Error("Unable to find projects: " + error.message);
    }
  }
  public async OrgUsers(
    OrgId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<any> {
    try {
      // console.log(OrgId);
      const options: any = {};
      if (OrgId) {
        options.where = { id: OrgId };
      }

      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;

      const organization = await Organization.findAll(options);
      console.log(organization)
      const people = organization[0].dataValues.People
      // organization.forEach((project) => {
      //   project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      // });


      return JSON.parse(people);
    } catch (error) {
      throw new Error("Unable to find projects: " + error.message);
    }
  }
}
