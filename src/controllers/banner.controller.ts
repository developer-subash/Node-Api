// import  {jwt} from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { IBanner } from '../models/banner.model';
import { BannerValidationSchema } from '../schemas/banner.schema';
import { BannerService } from '../services/banner.service';
import { Constants } from '../utils/constants';
import { SendResponse } from '../utils/sendResponse';
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

class BannerController {
    private readonly _bannerServiceInstance;
    constructor() {
        this._bannerServiceInstance = new BannerService();
    }

    /**
     * @description responsiable to fetch all users list
     * @param {express.Request} req 
     * @param { express.Response} res 
     * @param {express.NextFunction} next 
     * @returns { Banner } Array of Banner
    */
     fetchAll = async (
        req: Request,
        res: Response,
    ) => {
        try {
            const data =  await this._bannerServiceInstance.fetchAll();
            SendResponse.sendSuccessResponse(res, 200, data);
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }

    /**
     * Handles to store banner in database
     * @param {express.Request} req 
     * @param { express.Response} res
     */

    createBanner = (
        req: Request,
        res: Response
    ) => {

        try {
            const item: IBanner = req.body;
            // First need to check validations Error and if error found throw msg
            const validationErrors = SendResponse.checkValidation(BannerValidationSchema, item);
            if (!!validationErrors) {
                SendResponse.sendValidationError(res, validationErrors);
            }

            //After pass validation continue from here 
            const imgName = `${Date.now()}.png`;
            item.imageUrl = imgName;
            const ImgPath = path.join(__dirname, `../assets/banner/images/${imgName}`);
            const imgData = req.body.imageUrl;
            // to convert base64 format into random filename
            const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');

            // implement logic to save data on collections
            const data = this._bannerServiceInstance.create(item);
            fs.writeFileSync(ImgPath, base64Data, { encoding: 'base64' });
            SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'Banner Created successFully');
        } catch (e: any) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
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

    uploadImg =  (req: any, res: Response) => {
        try {
            const imgData = req.file.buffer;
            console.log("imgData", req.file);
            const result =  cloudinary.uploader.upload(imgData);
            console.log(result);
            res.json(result);
        } catch (error) {
            
        }
    }
}

 const IBannerController = new BannerController();
 export default IBannerController;