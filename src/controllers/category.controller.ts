// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SendResponse } from '../utils/sendResponse';
import { CategoryService } from '../services/category.service';
import { ICategory } from './../models/category.model';
import { Constants } from '../utils/constants';
import { CategoryValidationSchema } from '../schemas/category.schema';

class CategoryController {

    private readonly _categoryServiceInstance;
    constructor() {
         this._categoryServiceInstance = new CategoryService()   
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
        const data = this._categoryServiceInstance.fetchAll(); 

    }

    createCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            // First need to check validations Error and if error found throw msg
            const categoryItem: ICategory = req.body;
            const validationErrors = SendResponse.checkValidation(CategoryValidationSchema, categoryItem);
            if (!!validationErrors) {
                SendResponse.sendValidationError(res, validationErrors);
            }

            // After validation pass further process to save category to DB
            const data = await this._categoryServiceInstance.create(categoryItem);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, data, 'Category Created successFully');

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    deleteCategory = (
        req: Request,
        res: Response
    ) => {
        const categoryId: string = req.params.catId;
        const data = this._categoryServiceInstance.delete(categoryId);
        SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Category Deleted successFully');
    }

    updateCategory = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

    }
}

const ICategoryController = new CategoryController();
export default ICategoryController;