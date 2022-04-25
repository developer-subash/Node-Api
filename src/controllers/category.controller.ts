// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SendResponse } from '../utils/sendResponse';
import categoryServiceInstance from '../services/category.service';
import { ICategory } from './../models/category.model';
import { Constants } from '../utils/constants';
import { CategoryValidationSchema } from '../schemas/category.schema';

class CategoryController {

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
        categoryServiceInstance.fetchAll((error, result) => {
            if (error)
                SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, 'Something went wrong');
            else
                SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, result, 'Category Fetched successFully');
        });

    }

    createCategory = (
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
                return;
            }

            // After validation pass further process to save category to DB

            categoryServiceInstance.create(categoryItem, (error, result) => {
                if (error)
                    SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, 'Something went wrong');
                else
                    SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_CREATED, result, 'Category Created successFully');
            })

        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    deleteCategory = (
        req: Request,
        res: Response
    ) => {
        const categoryId: string = req.params.catId;
        categoryServiceInstance.delete(categoryId, (error, result) => {
            if (error)
                SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, error);
            else
                SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, result, 'Category Deleted successFully');
        });
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