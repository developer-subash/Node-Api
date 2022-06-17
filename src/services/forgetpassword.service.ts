import mongoose from 'mongoose';
import { forgetPasswordRequestInterface, ILogin, LoginResponse } from '../interfaces/User';
import User, { IUser } from '../models/user.model';
import { UserRepository } from '../repositories/User/UserRepository';
import  brcypt  from 'bcrypt';
import { Constants } from '../utils/constants';
import Jwt from 'jsonwebtoken';
import { ForgetPasswordRepository } from './../repositories/User/ForgetPassword/ForgetPasswordRepository';
import UserForgetPasswordModel, { IForgetPassword } from '../models/forgetpassword.model';

export class ForgetPasswordService {
    private readonly _userForgetPasswordRepository;
    private readonly _userRepository;

    constructor() {
        this._userForgetPasswordRepository = new ForgetPasswordRepository(UserForgetPasswordModel);
        this._userRepository = new UserRepository(User);
    }
    /**
     * 
     * @param requestPasswordInfo 
     * @returns {void}
     */
    requestForgetPassword = async (requestPasswordInfo: forgetPasswordRequestInterface)=> {
       const requestForgetPassword: any = await this._userForgetPasswordRepository.create(requestPasswordInfo);
        return requestForgetPassword.token;
    }

    /**
     * 
     * @param requestPasswordInfo 
     * @returns 
     */

    totalRequestForPasswordReset = async (userInfo: IUser): Promise<any> => {
       return await this._userForgetPasswordRepository.fetchGroupByData(userInfo._id);
    }

    isUserRequested = async (userId: mongoose.Types.ObjectId) : Promise<boolean>=> {
       return !!await this._userForgetPasswordRepository.isUserRequested(userId);
    }
    /**
     * Resposiable to handle , update collection value to valid: false and token will be empty 
       before new request added
     */
    fetchAndUpdateCollectionBeforeRequest = async (userId: mongoose.Types.ObjectId): Promise<void> => {
        await this._userForgetPasswordRepository.fetchAndUpdateCollectionBeforeRequest(userId);
    }
}