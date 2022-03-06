import { Response } from 'express';
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
}
