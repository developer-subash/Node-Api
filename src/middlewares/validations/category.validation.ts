import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { SendResponse } from "../../utils/sendResponse";
const jwt = require('jsonwebtoken');
import { Constants } from "../../utils/constants";

const usersHavingSameEmail = async (req: Request, res: Response, next: NextFunction) => {
    const userServiceInstance = new UserService();
    const data = await userServiceInstance.usersHavingSameEmail(req.body.email);
    if (data.length > 1) {
        SendResponse.sendErrorResponse(res, 400, 'Having Same email for more than one User, Please contact admin');
    } else
        next();
}

const checkValidToken = async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorization = req.headers.authorization.split(' ')[1];
        const data = jwt.verify(authorization, Constants.Keys.TOKEN_SECRET);
        if (data && !!data?.user) next();
    } catch (error) {
        SendResponse.sendErrorResponse(res, 403, 'Problem while Doing Action', `Not Authorized to access this url`);
    }
} 

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];
    if (!!bearerHeader) {
        const bearerTxt = bearerHeader.split(" ")[0];
        const token = bearerHeader.split(" ")[1];
        if (bearerTxt !== "Bearer" || token == "") {
            SendResponse.sendErrorResponse(res, 401, 'token Provided is not matched');
            return;
        }
        next();
    } else {
        SendResponse.sendErrorResponse(res, 401, `token n't Provided in current request`);
        return;
    }
}

export const verifyLogin = {
    usersHavingSameEmail,
    checkValidToken,
    verifyToken
  };