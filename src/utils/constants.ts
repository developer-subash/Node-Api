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
        HTTP_SUCCESS: 200,
        HTTP_BAD_REQUEST: 400,
        METHOD_NOT_ALLOWED: 405,
        TOO_MANY_REQUESTS: 429,
        NETWORK_AUTHENTICATION_REQUIRED: 511,
    } as const;

    export const Keys = {
        TOKEN_SECRET : '09f26e402586e2faa8da4c98a35f1b20d6b033c60',
        REFRESH_TOKEN_SECRET : '09f26e402586e2faa8da4c98a35f1b20d6b088df90',
    }


    export const StandardMessage = {
        ServerError: 'Oops... something went wrong please try again later',
        PasswordNotMatchError: `Entered Password Was N't Correct`,
        EmailNotMatchError: `Entered Email Was N't Correct`,
        EmailNotificationLabel: `Email Notifications For User Created`,
        UserCreateedEmailDesc: `Your New Account Is Created,  Now You Able To Login To System`,
        RequestForgetPasswordDesc: `,  Now You Able To Login To System`,
        
    }

    export const PermissionNames = {
        CanView : 'can_view',
        CanDelete : 'can_delete',
        CanEdit : 'can_edit',
    } as const;

}





// class Constants {
    
//     static DB_CONNECTION_STRING: string  = "mongodb://localhost:27017/nodeTest"; 
// }
// Object.seal(Constants);
// export = Constants;


