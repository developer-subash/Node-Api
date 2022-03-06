// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import roleServiceInstance from './../services/role.service';
import { IRole } from './../models/role.model';
import { SendResponse } from './../utils/sendResponse';

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
      roleServiceInstance.fetchAll((error, result) => {

      });
    }

    createRole = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        var role : IRole= <IRole>req.body; 
        roleServiceInstance.create(role, (error, result) => {
            if (error)
               SendResponse.sendErrorResponse(res,501,'Something went wrong');
            else
                SendResponse.sendSuccessResponse(res, 201, result, 'Role Created successFully');
        });
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