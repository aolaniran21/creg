import Project from "./project.entity";
import { CreateProject, UpdateProject } from "./project.interface";
import User from "../../entity/users/user.entity";
import Organization from "../organization/organization.entity";
import { LGAType, ProjectApproval } from "./project.enum";

export class ProjectService {
  public async createProject(projectData: CreateProject): Promise<Project> {
    const userExists = await User.findByPk(projectData.UserID);
    if (!userExists) {
      throw new Error("User does not exist");
    }

    const orgExists = await Organization.findByPk(projectData.OrgID);
    if (!orgExists) {
      throw new Error("Organization does not exist");
    }

    try {
      const newData = {
        ...projectData,
      };
      // console.log(newData);
      const newProject = await Project.create(newData);
      newProject.dataValues.LGA_SHORTCODE = LGAType[newProject.dataValues.LGA];
      return newProject;
    } catch (error) {
      throw new Error("Unable to create project: " + error.message);
    }
  }

  public async updateProject(
    projectId: string,
    projectData: UpdateProject
  ): Promise<Project> {
    try {
      const project = await Project.findByPk(projectId);
      if (!project) {
        throw new Error("Project not found");
      }
      // if (project.dataValues.Status == "DEACTIVATED") {
      //   throw new Error("Organization is deactivated");
      // }

      // Exclude ID from the update operation
      const { ID, ...updateData } = projectData;

      // Update the project with the remaining fields
      const updatedProject = await project.update(updateData);
      updatedProject.dataValues.LGA_SHORTCODE =
        LGAType[updatedProject.dataValues.LGA];

      return updatedProject;
    } catch (error) {
      throw new Error("Unable to update project: " + error.message);
    }
  }

  public async listProjects(
    OrgId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<Project[]> {
    try {
      console.log(OrgId);
      const options: any = {};

      // let where = {};



      if (OrgId) {
        if (OrgId != "ADMIN") {
          options.where = { OrgID: OrgId };
        }
      }

      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;

      const projects = await Project.findAll(options);
      projects.forEach((project) => {
        project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      });

      return projects;
    } catch (error) {
      throw new Error("Unable to find projects: " + error.message);
    }
  }

  public async getProject(projectId: string): Promise<Project> {
    try {
      const project = await Project.findByPk(projectId, {
        include: [{ model: Organization, as: "organizations" }],
      });
      if (!project) {
        throw new Error("Project not found");
      }

      project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];

      // console.log(project.dataValues);
      return project;
    } catch (error) {
      throw new Error("Unable to find project: " + error.message);
    }
  }

  public async listPublicProjects(
    page: number = 1,
    pageSize: number = 20
  ): Promise<Project[]> {
    try {
      const options: any = {};
      options.where = { is_public: true };
      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;

      // console.log(options);

      const projects = await Project.findAll(options);

      projects.forEach((project) => {
        project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      });

      return projects;
    } catch (error) {
      throw new Error("Unable to find project: " + error.message);
    }
  }


  public async missingProjDetails(
    OrgId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<Project[]> {
    try {
      // console.log(OrgId);
      const options: any = {};
      if (OrgId) {
        options.where = { OrgID: OrgId, ProjectApproval: "REJECTED" };
      }

      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;

      const projects = await Project.findAll(options);
      projects.forEach((project) => {
        project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      });

      // let missingProj: Project[] = []
      // projects.forEach((proj, index) => {
      //   let missing = false;
      //   for (const prop in proj.dataValues) {
      //     if (proj[prop] == "" || proj[prop] == null || proj[prop] == undefined) {


      //       missing = true;
      //       break;


      //     }
      //   }

      //   if (missing) {
      //     missingProj.push(proj);
      //   }
      // })
      // return missingProj;
      return projects;
    } catch (error) {
      throw new Error("Unable to find projects: " + error.message);
    }
  }
  public async pendingProject(
    UserId: string,
    OrgId: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<Project[]> {
    try {
      // console.log(OrgId);
      const options: any = {};
      if (UserId && OrgId) {
        options.where = { user_id: UserId, org_id: OrgId, ProjectApproval: "PENDING" };
      }

      options.limit = pageSize;
      options.offset = (page - 1) * pageSize;

      const projects = await Project.findAll(options);
      projects.forEach((project) => {
        project.dataValues.LGA_SHORTCODE = LGAType[project.dataValues.LGA];
      });


      return projects;
    } catch (error) {
      throw new Error("Unable to find projects: " + error.message);
    }
  }

  // public async approveProject(ProjId: string): Promise<any> {
  //   try {
  //     const project = await Project.findByPk(ProjId);
  //     if (!project) {
  //       throw new Error("Project not found");
  //     }

  //   } catch (error) {
  //     throw new Error("Unable to approve project: " + error.message);

  //   }

  // }
}
