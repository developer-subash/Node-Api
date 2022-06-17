// import  {jwt} from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { UserValidationSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';
import { SendResponse } from '../utils/sendResponse';
import brcypt from 'bcrypt';
import { Constants } from '../utils/constants';
import { ForgetPasswordService } from '../services/forgetpassword.service';
import { forgetPasswordRequestInterface } from '../interfaces/User';
class UserForgetPasswordController {

    private readonly _userServiceInstance;
    private readonly _utilityServiceInstance;
    private readonly _userForgetPasswordServiceInstance;

    constructor() {
        this._userServiceInstance = new UserService()
        this._utilityServiceInstance = new UtilsService();
        this._userForgetPasswordServiceInstance = new ForgetPasswordService();
    }

    

    /**
     * This method handles for Store User forget Password history
     * @param req Express Request
     * @param res Express Response
     * @returns 
     */

    create = async (
        req: Request,
        res: Response
    ) => {
        try {
            const item: IUser = req.body;
            /** check Validation message  */
            const validationErrors = SendResponse.checkValidation(UserValidationSchema, item);
            if (!this._utilityServiceInstance.isEmpty(validationErrors)) {
                SendResponse.sendValidationError(res, validationErrors);
                return;
            }
            const salt = await brcypt.genSalt(10);
            item.password = await brcypt.hash(item.password, salt);
            await this._userServiceInstance.create(item)
                .then(async data => {
                    const { email, firstName, middleName, lastName } = item;
                    const text = `Hello ${firstName} ${middleName} ${lastName},${Constants.StandardMessage.UserCreateedEmailDesc}`;
                    /** Send Email notofication after user Registered SuccessFully */
                    await this._utilityServiceInstance.sendEmail(email, Constants.StandardMessage.EmailNotificationLabel, text);
                    SendResponse.sendSuccessResponse(res, Constants.STATUSLIST.HTTP_SUCCESS, data, 'User Created successFully');
                })
                .catch(error => {
                    SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
                });
        } catch (error) {
            SendResponse.sendErrorResponse(res, Constants.STATUSLIST.HTTP_INTERNAL_ERROR, Constants.StandardMessage.ServerError);
        }
    }
/**
 * Resposiable to 
 * @param req 
 * @param res 
 * @returns 
 */
    requestForgetPassword = async (
        req: Request,
        res: Response
    ) => {

        try {

            const { email } = req.body;
            let userInfo:  IUser = await this._userServiceInstance.usersHavingSameEmail(email)
                .then(async (user) => {
                    return await user[0];
                })

            if (!userInfo) {
                SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.EmailNotMatchError);
                return;
            }
            /**
             *  check weather uses continue trying to forgetpassword more than 3 times with in one day
             *  current logic is not to continue forget more than 3 times with in 24 hours this logic will implement later not now
             *  and also check last documnet have is still valid and having token 
             **/
            const requestPasswordInfo:forgetPasswordRequestInterface  = {
                token: this._utilityServiceInstance.randomFixedInteger(6),
                valid: true,
                user: userInfo._id,
                lastlogindate: userInfo.lastLoginDate
            }
            // Before add documents need to verify ,update all previous collections has valid false and token was empty
            await this._userForgetPasswordServiceInstance.fetchAndUpdateCollectionBeforeRequest(userInfo._id);
            //    let totalRequestForPasswordReset = await this._userForgetPasswordServiceInstance.totalRequestForPasswordReset(userInfo);
           const token = await this._userForgetPasswordServiceInstance.requestForgetPassword(requestPasswordInfo);
            SendResponse.sendSuccessResponse(res, 200, {token}, 'Send otp / token in gmail please check inbox');
        } catch (error) {
            SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.ServerError, 'Refresh Token Validity Is Expired, Please Login To get Refresh Token');
        }
    }

    /**
     * responsiable to update password
     * 
     */
    updatePassword = async (
        req: Request,
        res: Response
    ) => {
        try {

            const {email, password, confirmPassword} = req.body;

            //check password and confirmpassword was same then proceed 
             
            if(password == confirmPassword) {
             
                const userInfo: IUser = await this._userServiceInstance.usersHavingSameEmail(email)
                    .then(async (user) => {
                        return await user[0];
                    })
                // update password of user on the basis of provided email but before check is user already requested or not 
               const requestAlready = this._userForgetPasswordServiceInstance.isUserRequested(userInfo._id).then(response => response);
               if(!requestAlready) 
               SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.ServerError, 'User had not requested for forget password requested');
               await this._userServiceInstance.updatePassword(userInfo._id, password);

                await this._userForgetPasswordServiceInstance.fetchAndUpdateCollectionBeforeRequest(userInfo.id);
                SendResponse.sendSuccessResponse(res, 200, {}, 'SuccessFully Updated Password');    
            } else {
                SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.ServerError, 'Password and Confirm Password Doesnot matched');
            }

        } catch (error) {
            SendResponse.sendErrorResponse(res, 403, Constants.StandardMessage.ServerError, 'Refresh Token Validity Is Expired, Please Login To get Refresh Token');
        }
    }

   
}

const userForgetPasswordControllerInstance = new UserForgetPasswordController();
export default userForgetPasswordControllerInstance;