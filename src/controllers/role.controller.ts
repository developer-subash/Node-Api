// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IRole } from './../models/role.model';
import { SendResponse } from './../utils/sendResponse';
import { Constants } from '../utils/constants';
import {  RoleValidationSchema } from '../schemas/role.schema';
// import RoleValidationSchema from '../schemas/role.schema';
import { RoleService } from './../services/role.service';
import { UtilsService } from '../services/utils.service';
import mongoose from 'mongoose';
const Joi = require('joi'); 
class RoleController {

    private readonly _roleServiceInstance;
    private readonly _utilityServiceInstance;

    constructor() {
        this._roleServiceInstance =  new RoleService()
        this._utilityServiceInstance = new UtilsService();
    }

    /**
     * @description responsiable to fetch all users list
     * @param {express.Request} req 
     * @param { express.Response} res 
     * @param {express.NextFunction} next 
     * @returns { User } Array of User
    */
    fetchAll = async (
        req: Request,
        res: Response
    ) => {

        try {
          const roleList =  await this._roleServiceInstance.fetchAll();  
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    createRole = async (
        req: Request,
        res: Response
    ) => {
        try {
            const role: IRole = <IRole>req.body;
            // check validation 
            const validationErrors = SendResponse.checkValidation(RoleValidationSchema, role);
            if (!this._utilityServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
            const data = await this._roleServiceInstance.create(role);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Role Created successFully');
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    deleteRole = async (
        req: Request,
        res: Response
    ) => {
       try {
        const roleId: string = req.params.roleId;
        const role = await this._roleServiceInstance.delete(roleId);
       } catch (error) {
         SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
       }
    }

    updateRole = (
        req: Request,
        res: Response
    ) => {
        
    }
}

 const roleControllerInstance = new RoleController();
 export default roleControllerInstance;