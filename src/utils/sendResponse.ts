import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IValidation } from '../interfaces/User';
// import CategoryValidationSchema from '../schemas/category.schema';
export namespace SendResponse {

    export const sendErrorResponse = (res: any, code: number, errorMessage: string, e: any = null) => res.status(code).send({
        status: 'error',
        error: errorMessage,
        e: e?.toString()
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

    export const validateRequest = (req: Request, next: NextFunction, schema: any) => {
        const validationErrors: any = {};
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            error.details.filter((x:any) => validationErrors[x?.context?.key] = x.message)
            next(validationErrors);
        } else {
            req.body = value;
            next();
        }
    }

    export const sendValidationError = ( res: Response,erros:any,message='Please fill all field', code: number = 404) => {
        res.status(code).send({
            status: 'validation Error',
            erros,
            message
        });
    }
}
