import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IValidation } from '../interfaces/User';
// import CategoryValidationSchema from '../schemas/category.schema';
export namespace SendResponse {

    export const sendErrorResponse = (res: any, code: number, errorMessage: string, e: any = null): Response => res.status(code).send({
        status: 'error',
        message: errorMessage,
        data: e?.toString()
    });
    
    export const sendSuccessResponse = (res: Response, code: number = 200, data: any, message:string = 'Successfully') => res.status(code).send({
        status: 'success',
        data,
        message
    });

    /**
     * 
     * @param validationSchema Schema Which need to be validate
     * @param postData requested post data which validate acc to schema
     * @param message Message to show in
     * @returns 
     */

    export const checkValidation = (validationSchema:any,postData: any , message:string = 'please fill all field'):  IValidation => {
        const validationErrors: IValidation = {};
        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };

        // validate request body against schema
        const { error } = validationSchema.validate(postData,options);
        if (error) 
            error.details.filter((x:any) => validationErrors[x?.context?.key] = x.message)
            
        return validationErrors;
    }

    export const sendValidationError = ( res: Response,data:any,message='Please fill all field', code: number = 422): Response =>  res.status(code).send({
            status: 'Error',
            data,
            message
        });

    export const sendPermissionDeniedError = ( res: Response,data:any = [],message='UnAuthorized to access api', code: number = 401): Response =>  res.status(code).send({
            status: 'Denied',
            message
        });
}
