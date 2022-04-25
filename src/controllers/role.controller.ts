// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import roleServiceInstance from './../services/role.service';
import { IRole } from './../models/role.model';
import { SendResponse } from './../utils/sendResponse';
import { Constants } from '../utils/constants';
import {  RoleValidationSchema } from '../schemas/role.schema';
// import RoleValidationSchema from '../schemas/role.schema';
const Joi = require('joi'); 
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
        res: Response
    ) => {
      roleServiceInstance.fetchAll((error, result) => {
          if (error)
              SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, 'Something went wrong');
          else
              SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, result, 'Roles Fetched successFully');
      });
    }

    createRole = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        var role : IRole= <IRole>req.body;

        // check validation 
        const validationErrors = SendResponse.checkValidation(RoleValidationSchema, role);

        if (!!validationErrors) {
            SendResponse.sendValidationError(res, validationErrors);
            return;
        }

        roleServiceInstance.create(role, (error: any, result: any) => {
            if (error)
                SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, 'Something went wrong');
            else
                SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, result, 'Roles Created successFully');
        });
    }

    deleteRole = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
       try {
        const roleId: string = req.params.roleId;
        roleServiceInstance.delete(roleId, (error, result) => {
            if (error)
                SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, error);
            else
              SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, result, 'Role Deleted successFully');
         })
       } catch (error) {
         SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
       }
    }

    updateRole = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        
    }
}

 const roleControllerInstance = new RoleController();
 export default roleControllerInstance;