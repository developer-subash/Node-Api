// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import { UserValidationSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { SendResponse } from '../utils/sendResponse';
import  brcypt  from 'bcrypt';
import { Constants } from '../utils/constants';
import { ILogin, LoginValidationSchema } from '../interfaces/User';
import mongoose from 'mongoose';
import  jwt, { JwtPayload }  from 'jsonwebtoken';

class UserController {

    private readonly _userServiceInstance;
    private readonly _utilityServiceInstance;
    private refreshTokens : Array<string> = [];
    constructor() {
        this._userServiceInstance = new UserService()
        this._utilityServiceInstance = new UtilsService();
    }

    /**
     * @description responsiable to fetch all users list
     * @param {express.Request} req 
     * @param { express.Response} res 
     * @param {express.NextFunction} next 
     * @returns { User } Array of User
    */
    fetchAll = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        // userServiceInstance.fetchAll();
        res.send("hello from fetch user");
    }

    /**
     * This method handles for Store User
     * @param req Express Request
     * @param res Express Response
     * @returns 
     */

    createUser = async (
        req: Request,
        res: Response
    ) => {
        try {
            const item: IUser = (req.body);
            /** check Validation message  */
            const validationErrors = SendResponse.checkValidation(UserValidationSchema, item);
            if (!this._utilityServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
            const salt = await brcypt.genSalt(10);
            item.password = await brcypt.hash(item.password, salt);
            const data = await this._userServiceInstance.create(item);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'User Created successFully');

        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }

    }

    /**
     * 
     * @param req Express.Request
     * @param res Express.Response
     */
    login = async (
        req: Request,
        res: Response
    ) => {
        try {
            const item: ILogin = req.body;
            // check validation before process anything
            const validationErrors = SendResponse.checkValidation(LoginValidationSchema, item);
            if (!this._utilityServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
            // implement logic for login
            await this._userServiceInstance.login(item)
                .then(data => {
                    this.refreshTokens.push(data.accessToken);
                    SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'User Logged In successFully')
                })
                .catch(Error => {
                    SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, 'something Went Wrong While Logged in', Constants.StandardMessage.PasswordNotMatchError);
                })
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    } 

    deleteUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    }

    updateUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    }

    /**
     * 
     * @param req Express Request
     * @param res Express Response
     * @returns 
     */

    public generateAccessToken = async (req: Request, res: Response) : Promise<void>=> {
        try {
            const refreshToken = req.body.token;
            let data: string | JwtPayload['user'];
            let accessToken;
            if (!refreshToken || !this.refreshTokens.includes(refreshToken)) {
                SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.ServerError, 'Refresh Token is not Provided in request');
                return;
            } else {
                data = jwt.verify(refreshToken, Constants.Keys.REFRESH_TOKEN_SECRET);
                if (data && !!data['user'])
                    accessToken = await this._userServiceInstance.generateAccessToken(data['user']);
                SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, { accessToken }, 'Access Token Genereted Successfully');
            }
        } catch (error) {
            SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.ServerError, 'Refresh Token Validity Is Expired, Please Login To get Refresh Token');
        }
    }
}

 const userControllerInstance = new UserController();
 export default userControllerInstance;