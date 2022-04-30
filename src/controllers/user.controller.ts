// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user.model';
import { UserValidationSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { SendResponse } from '../utils/sendResponse';
import  brcypt  from 'bcrypt';
import { Constants } from '../utils/constants';

class UserController {

    private readonly _userServiceInstance;
    private readonly _utilityServiceInstance;
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
            const user: IUser = new User(item);
            user.password = await brcypt.hash(user.password, salt);
            
        const data = await this._userServiceInstance.create(user);
        SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'User Created successFully');

       } catch (error) {
           console.log(error);
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
}

 const userControllerInstance = new UserController();
 export default userControllerInstance;