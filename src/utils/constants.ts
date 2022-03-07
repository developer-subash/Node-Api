export namespace Constants {
    export const ROLESLIST = {
        ROLE_SUPER_ADMIN: 'Super Admin',
        ROLE_ADMIN: 'Admin',
        ROLE_MODERATOR: 'Moderator',
        ROLE_AUTHENTICATED: 'Authenticated',
    } as const;

    export const STATUSLIST: {[key: string]: number} = {
        HTTP_NOT_FOUND: 404,
        HTTP_INTERNAL_ERROR: 500,
        HTTP_UNAUTHORIZED_ERROR: 401,
        HTTP_VALIDATION_ERROR: 403,
        HTTP_CREATED: 201,
        HTTP_BAD_REQUEST: 400,
        METHOD_NOT_ALLOWED: 405,
        TOO_MANY_REQUESTS: 429,
        NETWORK_AUTHENTICATION_REQUIRED: 511,
    } as const;

}





// class Constants {
    
//     static DB_CONNECTION_STRING: string  = "mongodb://localhost:27017/nodeTest"; 
// }
// Object.seal(Constants);
// export = Constants;


