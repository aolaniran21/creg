import Organization from "../organization/organization.entity";
import Project from "../project/project.entity";
import User from "../../entity/users/user.entity";
import { sequelize } from "../../sequelize.config";
import { or } from "sequelize";

export class MetricsService {


    public async pendingRequest(): Promise<any> {
        try {
            let pending_proj = 0
            let pending_org = 0

            const organization = await Organization.findAll({
                where: {
                    OrgApproval: "PENDING",
                },
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                SELECT COUNT(*)
                FROM "organizations" AS "Org"
              )`),
                            'orgCount'
                        ]
                    ]
                },

            });
            // console.log(organization)s
            const project = await Project.findAll({
                where: {
                    ProjectApproval: "PENDING",
                },
                attributes: {
                    include: [
                        [
                            sequelize.literal(`(
                SELECT COUNT(*)
                FROM "projects" AS "Proj"
              )`),
                            'projectCount'
                        ]
                    ]
                },

            });

            // console.log(project)

            if (project.length != 0) {
                pending_proj = project[0].dataValues.projectCount
            }
            if (organization.length != 0) {
                pending_org = organization[0].dataValues.orgCount
            }


            return { "pending_org": pending_org, "pending_proj": pending_proj };
        } catch (error) {
            throw new Error("Unable to find organization: " + error.message);
        }
    }

}
