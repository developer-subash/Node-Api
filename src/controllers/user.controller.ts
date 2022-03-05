// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user.service';
import { User } from './../interfaces/User';
import userServiceInstance from './../services/user.service';

class UserController {

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

    createUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        
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