import { Request, Response } from 'express';
import { SendResponse } from '../utils/sendResponse';
import { Constants } from '../utils/constants';
import { UtilsService } from '../services/utils.service';

import { PermissionService } from './../services/permission.service';
import { PermissionValidationSchema } from '../schemas/permission.schema';
import { IPermission } from '../interfaces/Permission';

class PermissionController {

    private readonly _permissionServiceInstance;
    private readonly _utilityServiceInstance;

    constructor() {
        this._permissionServiceInstance =  new PermissionService()
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
          const data =  await this._permissionServiceInstance.fetchAll();  
          SendResponse.sendSuccessResponse(res, 200, data);
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    createPermission = async (
        req: Request,
        res: Response
    ) => {
        try {
            const permission: IPermission = <IPermission>req.body;
            // check validation 
            const validationErrors = SendResponse.checkValidation(PermissionValidationSchema, permission);
            if (!this._utilityServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
            const data = await this._permissionServiceInstance.create(permission);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Permission Created successFully');
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    deletePermission = async (
        req: Request,
        res: Response
    ) => {
       try {
        const permissionId: string = req.params.permissionId;
        const permission = await this._permissionServiceInstance.delete(permissionId);
        SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, permission, 'Permission Deleted successFully');
       } catch (error) {
         SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
       }
    }

    updatePermission = async (
        req: Request,
        res: Response
    ) => {
        try {
            const permissionId: string = req.params.roleId;
            const permission: IPermission = <IPermission>req.body;
            const validationErrors = SendResponse.checkValidation(PermissionValidationSchema, permission);
            if (!this._utilityServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
            const data = await this._permissionServiceInstance.update(permissionId, permission);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Permission Created successFully');
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }
}

 const permissionControllerInstance = new PermissionController();
 export default permissionControllerInstance;