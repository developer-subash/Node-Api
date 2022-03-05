// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Role } from './../interfaces/Role';
import roleServiceInstance from './../services/role.service';

class RoleController {
    constructor() {
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
    //    const data = roleServiceInstance.fetchAll();
    //    res.send(data);
    console.log("hello");
    }

    createRole = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    }

    deleteRoll = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    }

    updateRoll = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    }
}

 const roleControllerInstance = new RoleController();
 export default roleControllerInstance;