// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { IFoodItem } from '../models/foodItem.model';
import { FoodItemValidationSchema } from '../schemas/foodItem.schema';
import { FoodItemService } from '../services/foodItem.service';
import { UtilsService } from '../services/utils.service';
import { Constants } from '../utils/constants';
import { SendResponse } from '../utils/sendResponse';
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

class FoodItemController {
    private readonly _foodItemServiceInstance;
    private readonly _utililsServiceInstance;

    constructor() {
        this._foodItemServiceInstance = new FoodItemService();
        this._utililsServiceInstance = new UtilsService();
    }

    /**
     * @description responsiable to fetch all users list
     * @param {express.Request} req 
     * @param { express.Response} res 
     * @param {express.NextFunction} next 
     * @returns { IFoodItemResponse } Array of Banner Including pagination information
    */
     fetchAll = async (
        req: Request,
        res: Response,
    ) => {
        try {

            // check current user had permission to access this url 
            const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
            const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItem, Constants.PermissionNames.CanView, token)
            if (!hasPermission) {
                SendResponse.sendPermissionDeniedError(res);
                return;
            }
       
            const page: number = Number(req.query.page) || 1;
            const limit: number = Number(req.query.limit) || 10;
            const sortKey: string = req.query.sortKey ? String(req.query.sortKey) : '_id';
            const sortOrder: string = req.query.sortOrder ? String(req.query.sortOrder) : '-1';
            const data =  await this._foodItemServiceInstance.fetchAll(page, limit, sortKey, sortOrder);
            SendResponse.sendSuccessResponse(res, 200, data);
        } catch (error) {
            console.log(error);
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    /**
     * Handles to store banner in database
     * @param {express.Request} req 
     * @param { express.Response} res
     */

    create = async (
        req: Request,
        res: Response
    ) => {

        try {

            /** Check user role and Permission before start */
            const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
            const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItem, Constants.PermissionNames.CanCreate, token);
            if (!hasPermission) {
                SendResponse.sendPermissionDeniedError(res);
                return;
            }

            const item: IFoodItem = req.body;
            // First need to check validations Error and if error found throw msg
            const validationErrors = SendResponse.checkValidation(FoodItemValidationSchema, item);
            if (!this._utililsServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
           
            //After pass validation continue from here 
            const imgName = `${Date.now()}.png`;
            item.imageUrl = imgName;
            const ImgPath = path.join(__dirname, `../assets/banner/images/${imgName}`);
            const imgData = req.body.imageUrl;
            // to convert base64 format into random filename
            const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');

            // implement logic to save data on collections
            const data = await this._foodItemServiceInstance.create(item);
            fs.writeFileSync(ImgPath, base64Data, { encoding: 'base64' });
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Banner Created successFully');
        } catch (e) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    deleteBanner = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
       try {


        /** Check user role and Permission before start */
        const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
        const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItem, Constants.PermissionNames.CanDelete, token);
        if (!hasPermission) {
            SendResponse.sendPermissionDeniedError(res);
            return;
        }

        const foodItemId: string = req.params.BannerId;
        const data = await this._foodItemServiceInstance.delete(foodItemId);
        SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Category Deleted successFully');  
       } catch (error) {
        SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
       }
    }

    updateFoodItem = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        /** Check user role and Permission before start */
        const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
        const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItem, Constants.PermissionNames.CanEdit, token);
        if (!hasPermission) {
            SendResponse.sendPermissionDeniedError(res);
            return;
        }
    }


    findById = async (
        req: Request,
        res: Response
    ) => {
        try {

            /** Check user role and Permission before start */
            const token: string = req.headers.authorization! && req.headers.authorization.split(' ')[1]!;
            const hasPermission = await this._utililsServiceInstance.fetchRoles(Constants.ModelNames.FoodItem, Constants.PermissionNames.CanView, token);
            if (!hasPermission) {
                SendResponse.sendPermissionDeniedError(res);
                return;
            }

            const id: string = String(req.query.id);
            const data = await this._foodItemServiceInstance.findById(id);
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Banner Fetched successFully');
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }
    // uploadImg =  (req: Request, res: Response) => {
    //     try {
    //         const imgData = req.file.buffer;
    //         console.log("imgData", req.file);
    //         const result =  cloudinary.uploader.upload(imgData);
    //         console.log(result);
    //         res.json(result);
    //     } catch (error) {
            
    //     }
    // }
}

 const IFoodItemController = new FoodItemController();
 export default IFoodItemController;