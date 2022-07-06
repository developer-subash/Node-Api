// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SendResponse } from '../utils/sendResponse';
import { CategoryService } from '../services/category.service';
import { ICategory } from './../models/category.model';
import { Constants } from '../utils/constants';
import { CategoryValidationSchema } from '../schemas/category.schema';
import { UtilsService } from './../services/utils.service';

class CategoryController {

    private readonly _categoryServiceInstance;
    private readonly _utililsServiceInstance;
    constructor() {
         this._categoryServiceInstance = new CategoryService();  
         this._utililsServiceInstance = new UtilsService();
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
        res: Response,
        next: NextFunction
    ) => {

        /** Check user role and Permission before start */
        const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
        const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItemCategory, Constants.PermissionNames.CanView, token);
        if (!hasPermission) {
            SendResponse.sendPermissionDeniedError(res);
            return;
        }

        const data = await this._categoryServiceInstance.fetchAll(); 
        SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, data, 'Category Fetched successFully');
    }

    createCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            /** Check user role and Permission before start */
            const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
            const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItemCategory, Constants.PermissionNames.CanCreate, token);
            if (!hasPermission) {
                SendResponse.sendPermissionDeniedError(res);
                return;
            }

            // First need to check validations Error and if error found throw msg
            const categoryItem: ICategory = req.body;
            const validationErrors = SendResponse.checkValidation(CategoryValidationSchema, categoryItem);
            if (!this._utililsServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }

            // After validation pass further process to save category to DB
            const data = await this._categoryServiceInstance.create(categoryItem);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, data, 'Category Created successFully');

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    deleteCategory = async (
        req: Request,
        res: Response
    ) => {

        /** Check user role and Permission before start */
        const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
        const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItemCategory, Constants.PermissionNames.CanDelete, token);
        if (!hasPermission) {
            SendResponse.sendPermissionDeniedError(res);
            return;
        }

        const categoryId: string = req.params.catId;
        const data = this._categoryServiceInstance.delete(categoryId);
        SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Category Deleted successFully');
    }

    updateCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
         /** Check user role and Permission before start */
         const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
         const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItemCategory, Constants.PermissionNames.CanEdit, token);
         if (!hasPermission) {
             SendResponse.sendPermissionDeniedError(res);
             return;
         }
    }
}

const ICategoryController = new CategoryController();
export default ICategoryController;