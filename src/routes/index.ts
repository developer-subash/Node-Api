// This is just a code but grou of routing is handle from index.ts other file

import express , {Request, Response }  from 'express';
import { SendResponse } from "../utils/sendResponse";
import * as UserRouter  from './user.route';
import * as RoleRouter  from './role.route';

export default (app: any) => {
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    /**  Old code commented Routing is control through index.ts Root file 
    const routePrefix = '/api/v1/';
    app.use(`${routePrefix}user`, UserRouter);
    app.use(`${routePrefix}role`, RoleRouter);

    app.all('*', (req: Request, res: Response) => SendResponse.sendErrorResponse(res, 404, 'Route does not exist'));
    */
};
