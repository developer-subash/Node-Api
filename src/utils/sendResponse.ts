export namespace SendResponse {

    export const sendErrorResponse = (res: any, code: number, errorMessage: string, e: any = null) => res.status(code).send({
        status: 'error',
        error: errorMessage,
        e: e?.toString(),
    });
    
    export const sendSuccessResponse = (res: any, code: number, data: any, message:string = 'Successful') => res.status(code).send({
        status: 'success',
        data,
        message,
    });

    // interface testResponse<T>  {
    //      data: T
    // }
    
}

// const sendResponseInstance = new SendResponse();
// export default sendResponseInstance;
