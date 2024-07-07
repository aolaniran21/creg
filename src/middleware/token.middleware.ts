import { NextFunction, Request, Response } from "express";
// import HttpException from "./../exceptions/HttpExceptions";
import { JWTHelper } from "../helpers/jwt.helper"
declare global {
    namespace Express {
        interface Request {
            curUser?: any; // Replace `any` with a more specific type if you know the structure of `curUser`
        }
    }
}

const jwtHelper = new JWTHelper();
async function tokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = jwtHelper.getToken(req)
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "UNAUTHORIZED",
            code: "UNAUTHORIZED"
        });
    } else {
        const result = await jwtHelper.authenticateToken(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(result)
        if (!result) {
            return res.status(401).json({
                error: true,
                message: "TOKEN_EXPIRED",
                code: "TOKEN_EXPIRED"
            });
        }
        if (result.success == false) {

            return res.status(401).json({
                error: true,
                message: "UNAUTHORIZED",
                code: "UNAUTHORIZED"
            });
        }
        req.curUser = result
        next();
    }

}
export default tokenMiddleware;
