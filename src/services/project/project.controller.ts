import express, { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ProjectService } from "./project.service";
import { CreateProject } from "./project.interface";
import tokenMiddleware from "../../middleware/token.middleware"
import { ProjectApproval } from "./project.enum";

export default class ProjectController {
  private projectService: ProjectService;
  public path = "/projects";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
    this.projectService = new ProjectService();
  }

  private validateProjectData(data: any) {
    const schema = Joi.object({
      UserID: Joi.string().guid({ version: "uuidv4" }).required(),
      OrgID: Joi.string().guid({ version: "uuidv4" }).required(),
      Headline: Joi.string().allow("", null),
      FullName: Joi.string().allow("", null),
      ShortDescription: Joi.string().allow("", null),
      LGA: Joi.string().required(),
      IsGroupProject: Joi.boolean().required(),
      IsPublic: Joi.boolean().required(),
      Website: Joi.string().uri().allow("", null),
      Image: Joi.string().allow("", null),
      StartDate: Joi.date().iso().required(),
      ProjectType: Joi.string().valid("NEW_PROJECT", "TRANSITION").required(),
      GHGProgram: Joi.string().valid("LASEPA", "FOREST_CARBON_CODE").required(),
      Sector: Joi.string().required(),
      ProjectStatus: Joi.string()
        .valid("DRAFT", "CONCEPT", "DEVELOPMENT", "VALIDATION", "VALIDATED")
        .required(),
    });
    return schema.validate(data);
  }

  private validateUpdateProjectData(data: any) {
    const schema = Joi.object({
      ID: Joi.string().guid({ version: "uuidv4" }).required(),
      OrgID: Joi.string().guid({ version: "uuidv4" }).required(),
      Headline: Joi.string().allow("", null),
      FullName: Joi.string().allow("", null),
      ShortDescription: Joi.string().allow("", null),
      LGA: Joi.string(),
      IsGroupProject: Joi.boolean(),
      IsPublic: Joi.boolean(),
      Website: Joi.string().uri().allow("", null),
      Image: Joi.string().allow("", null),
      StartDate: Joi.date().iso().allow("", null),
      ProjectType: Joi.string().valid("NEW_PROJECT", "TRANSITION"),
      GHGProgram: Joi.string().valid("LASEPA", "FOREST_CARBON_CODE"),
      Sector: Joi.string().allow("", null),
      ProjectStatus: Joi.string().valid(
        "DRAFT",
        "CONCEPT",
        "DEVELOPMENT",
        "VALIDATION",
        "VALIDATED"
      ),
      ProjectApproval: Joi.string().valid(
        "ACCEPTED",
        "PENDING",
        "REJECTED",
      ),
    });
    return schema.validate(data);
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, tokenMiddleware.bind(this), this.createProject);
    this.router.post(`${this.path}/list/all`, tokenMiddleware.bind(this), this.listProjects);
    this.router.post(`${this.path}/update`, tokenMiddleware.bind(this), this.updateProject);
    this.router.post(`${this.path}/incomplete`, tokenMiddleware.bind(this), this.missingProjDetails);
    this.router.post(`${this.path}/pending`, tokenMiddleware.bind(this), this.pendingProject);
    this.router.get(`${this.path}/:id`, tokenMiddleware.bind(this), this.getProject);
    this.router.get(`${this.path}/list/public`, this.getlistPublicProject);
  }

  public createProject = async (req: Request, res: Response) => {
    const validation = this.validateProjectData(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ success: false, message: validation.error.details[0].message });

    try {
      const projectData: CreateProject = {
        UserID: validation.value.UserID,
        OrgID: validation.value.OrgID,
        Headline: validation.value.Headline,
        FullName: validation.value.FullName,
        ShortDescription: validation.value.ShortDescription,
        LGA: validation.value.LGA,
        IsGroupProject: validation.value.IsGroupProject,
        IsPublic: validation.value.IsPublic,
        Website: validation.value.Website,
        Image: validation.value.Image,
        StartDate: validation.value.StartDate,
        ProjectType: validation.value.ProjectType,
        GHGProgram: validation.value.GHGProgram,
        Sector: validation.value.Sector,
        ProjectStatus: validation.value.ProjectStatus,
        ProjectApproval: ProjectApproval.PENDING,
      };
      const newProject = await this.projectService.createProject(projectData);
      return res.status(201).json({ success: true, data: newProject, message: "New Project Created. Sent to Admin for approval" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  public updateProject = async (req: Request, res: Response) => {
    const validation = this.validateUpdateProjectData(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ success: false, message: validation.error.details[0].message });
    if (req.curUser.role !== "ADMIN" && validation.value.ProjectApproval != "") {

      return res.status(401).json({
        error: true,
        message: "UNAUTHORIZED",
        code: "UNAUTHORIZED"
      });

    }
    try {
      const projectId = validation.value.ID;
      const updateData = {
        ...validation.value,
      };
      const updatedProject = await this.projectService.updateProject(
        projectId,
        updateData
      );
      return res.status(200).json({ success: true, data: updatedProject });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  public listProjects = async (req: Request, res: Response) => {
    try {
      const { OrgId, page, pageSize } = req.body;
      let userId: string;
      let orgIdNumber = OrgId;

      if (req.curUser.role == "ADMIN") {
        if (OrgId) {
          orgIdNumber = OrgId
        } else {
          orgIdNumber = "ADMIN";

        }
      } else {
        if (OrgId) {
          orgIdNumber = OrgId
        } else {
          throw new Error("OrgID is missing")
        }
      }
      // Convert query parameters to numbers if they exist
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20;

      const projects = await this.projectService.listProjects(
        orgIdNumber,
        pageNumber,
        pageSizeNumber
      );
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };
  public getProject = async (req: Request, res: Response) => {
    try {
      const projectId = req.params.id;
      const project = await this.projectService.getProject(projectId);
      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };

  public getlistPublicProject = async (req: Request, res: Response) => {
    try {
      const page = req.params.page;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      // console.log(req);
      const projects = await this.projectService.listPublicProjects(pageNumber);
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  };


  public missingProjDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { OrgId, page, pageSize } = req.body;

      // Convert query parameters to numbers if they exist
      const orgIdNumber = OrgId;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20;

      const projects = await this.projectService.missingProjDetails(
        orgIdNumber,
        pageNumber,
        pageSizeNumber
      );
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      next(error);

      return res.status(400).json({ success: false, message: error.message });
    }
  };
  public pendingProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ProjId, OrgId, page, pageSize } = req.body;

      // Convert query parameters to numbers if they exist
      const projIdNumber = ProjId;
      const orgIdNumber = OrgId;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20;

      const projects = await this.projectService.pendingProject(
        orgIdNumber,
        projIdNumber,
        pageNumber,
        pageSizeNumber
      );
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      next(error);

      return res.status(400).json({ success: false, message: error.message });
    }
  };
}
