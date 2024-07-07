import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { UserService } from "./user.service";
import { IUpdateUser } from "../../entity/users/user.interface";
const jwt = require("jsonwebtoken");
import tokenMiddleware from "../../middleware/token.middleware"

export default class UserController {
    private userService: UserService;
    public path = "/user";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
        this.userService = new UserService();
    }


    private validateUpdateUserData(data: any) {

        const schema = Joi.object({
            first_name: Joi.string().min(3).required(),
            last_name: Joi.string().min(3).required(),
            password: Joi.string().required(),
            confirm_password: Joi.ref("password"),
            phone: Joi.string()
                .length(11)
                .pattern(/^[0-9]+$/)
                .required(),
            gender: Joi.string().required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                })
                .required(),
        });
        return schema.validate(data);
    }


    private initializeRoutes() {
        this.router.post(`${this.path}/update`, tokenMiddleware.bind(this), this.updateUser);
        this.router.get(`${this.path}/list/all`, tokenMiddleware.bind(this), this.listUsers);
        this.router.get(`${this.path}/list/:id`, tokenMiddleware.bind(this), this.listUser);
    }



    public updateUser = async (req: Request, res: Response) => {
        const validation = this.validateUpdateUserData(req.body);
        if (validation.error)
            return res
                .status(400)
                .json({ success: false, data: validation.error.details[0].message });

        try {
            const userId = validation.value.ID;
            const updateData = {
                ...validation.value,
            };
            const updatedUser =
                await this.userService.updateUser(
                    userId,
                    updateData
                );
            return res.status(200).json({ success: true, data: updatedUser });
        } catch (error) {
            return res.status(400).json({ success: false, data: error.message });
        }
    };
    public listUsers = async (req: Request, res: Response) => {
        try {
            //   const userId: string = req.query.userID as string;


            if (req.curUser.role !== "ADMIN") {

                return res.status(401).json({
                    error: true,
                    message: "UNAUTHORIZED",
                    code: "UNAUTHORIZED"
                });

            }
            const Users = await this.userService.listUsers();
            return res.status(200).json({ success: true, data: Users });
        } catch (error) {
            return res.status(400).json({ success: false, data: error.message });
        }
    };
    public listUser = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id as string;

            const User = await this.userService.listUser(
                userId
            );
            return res.status(200).json({ success: true, data: User });
        } catch (error) {
            return res.status(400).json({ success: false, data: error.message });
        }
    };

}

