import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { OrganizationService } from "./organization.service";
import { CreateOrganization } from "./organization.interface";
import tokenMiddleware from "../../middleware/token.middleware"
import { OrgApproval, OrgStatus, OrgType } from "./org.enum";

export default class OrganizationController {
  private organizationService: OrganizationService;
  public path = "/org";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
    this.organizationService = new OrganizationService();
  }

  private validateOrganizationData(data: any) {
    const schema = Joi.object({
      UserID: Joi.string().guid({ version: "uuidv4" }).required(),
      OrgType: Joi.string().required(),
      Name: Joi.string().min(3).max(255).required(),
      RegNo: Joi.string().required(),
      Industry: Joi.string().required(),
      Address: Joi.string().allow("", null),
      LGA: Joi.string().required(),
      ZipPostCode: Joi.string().allow("", null),
      Website: Joi.string().uri().allow("", null),
      People: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            role: Joi.alternatives().try(Joi.string(), Joi.array()),
            email: Joi.string(),
          }).required()
        )
        .required(),
      OrgLogo: Joi.string().allow("", null),
      Status: Joi.string().required(),
      IsPublic: Joi.boolean().required(),
    });
    return schema.validate(data);
  }

  private validateUpdateOrganizationData(data: any) {
    const schema = Joi.object({
      ID: Joi.string().guid({ version: "uuidv4" }).required(),
      OrgType: Joi.string(),
      RegNo: Joi.string(),
      Industry: Joi.string(),
      Address: Joi.string().allow("", null),
      LGA: Joi.string(),
      ZipPostCode: Joi.string().allow("", null),
      Website: Joi.string().uri().allow("", null),
      People: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            role: Joi.alternatives().try(Joi.string(), Joi.array()),
            email: Joi.string(),
          }).required()
        ),
      OrgLogo: Joi.string().allow("", null),
      Status: Joi.string(),
      IsPublic: Joi.boolean(),
      OrgApproval: Joi.string(),
    });
    return schema.validate(data);
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, tokenMiddleware.bind(this), this.createOrganization);
    this.router.post(`${this.path}/update`, tokenMiddleware.bind(this), this.updateOrganization);
    this.router.get(`${this.path}/incomplete`, tokenMiddleware.bind(this), this.missingOrgDetails);
    this.router.get(`${this.path}/pending`, tokenMiddleware.bind(this), this.pendingOrg);
    this.router.get(`${this.path}/list/all`, tokenMiddleware.bind(this), this.listOrganization);
    this.router.get(`${this.path}/orgusers`, tokenMiddleware.bind(this), this.OrgUser);
  }

  public createOrganization = async (req: Request, res: Response) => {
    const validation = this.validateOrganizationData(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ success: false, data: validation.error.details[0].message });

    try {
      const orgData: CreateOrganization = {
        UserID: validation.value.UserID,
        OrgType: validation.value.OrgType,
        Name: validation.value.Name,
        RegNo: validation.value.RegNo,
        Industry: validation.value.Industry,
        Address: validation.value.Address,
        LGA: validation.value.LGA,
        ZipPostCode: validation.value.ZipPostCode,
        Website: validation.value.Website,
        People: validation.value.People,
        OrgLogo: validation.value.OrgLogo,
        Status: validation.value.Status,
        IsPublic: validation.value.IsPublic,
        OrgApproval: OrgApproval.PENDING,
      };
      const newOrganization = await this.organizationService.createOrganization(
        orgData
      );
      return res.status(201).json({ success: true, data: newOrganization, message: "New Organization Created. Sent to Admin for approval" });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };

  public updateOrganization = async (req: Request, res: Response) => {
    const validation = this.validateUpdateOrganizationData(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ success: false, data: validation.error.details[0].message });

    // console.log(req.curUser)
    if (req.curUser.role !== "ADMIN" && validation.value.OrgApproval != "") {

      return res.status(401).json({
        error: true,
        message: "UNAUTHORIZED",
        code: "UNAUTHORIZED"
      });

    }
    try {
      const organizationId = validation.value.ID;
      const updateData = {
        ...validation.value,
      };
      const updatedOrganization =
        await this.organizationService.updateOrganization(
          organizationId,
          updateData
        );
      return res.status(200).json({ success: true, data: updatedOrganization, message: "Organization Updated" });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };
  public listOrganization = async (req: Request, res: Response) => {
    try {
      let userId: string;
      if (req.curUser.role == "ADMIN") {
        if (req.query.userID) {
          userId = req.query.userID as string;
        } else {
          userId = "ADMIN";

        }
      } else {
        if (req.query.userID) {
          userId = req.query.userID as string;
        } else {
          throw new Error("userID is missing")
        }
      }
      const Organization = await this.organizationService.listOrganization(
        userId
      );
      return res.status(200).json({ success: true, data: Organization });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };
  public missingOrgDetails = async (req: Request, res: Response) => {
    try {
      const userId: string = req.query.userID as string;

      const Organization = await this.organizationService.missingOrgDetails(
        userId
      );
      return res.status(200).json({ success: true, data: Organization });
    } catch (error) {
      return res.status(400).json({ success: false, data: error.message });
    }
  };

  public pendingOrg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { UserId, page, pageSize } = req.body;

      // Convert query parameters to numbers if they exist
      const userIdNumber = UserId;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20;

      const projects = await this.organizationService.pendingOrg(
        userIdNumber,
        pageNumber,
        pageSizeNumber
      );
      return res.status(200).json({ success: true, data: projects });
    } catch (error) {
      next(error);

      return res.status(400).json({ success: false, message: error.message });
    }
  };
  public OrgUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { OrgId, page, pageSize } = req.query;

      // Convert query parameters to numbers if they exist
      const orgIdNumber: string = OrgId as string;
      const pageNumber = page ? parseInt(page as string, 10) : 1;
      const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20;

      const projects = await this.organizationService.OrgUsers(
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
}

