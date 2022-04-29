// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import { UserValidationSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { SendResponse } from '../utils/sendResponse';

class UserController {

    private readonly _userServiceInstance;
    constructor() {
        this._userServiceInstance = new UserService()
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
        const item: IUser = req.body;

        /** check Validation message  */
        const validationErrors = SendResponse.checkValidation(UserValidationSchema, item);
            if (!!validationErrors) {
                SendResponse.sendValidationError(res, validationErrors);
            }

        const data = await this._userServiceInstance.create(item);
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