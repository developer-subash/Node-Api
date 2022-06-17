import mongoose from 'mongoose';
import { ILogin, LoginResponse } from '../interfaces/User';
import User, { IUser } from '../models/user.model';
import { UserRepository } from '../repositories/User/UserRepository';
import  brcypt  from 'bcrypt';
import { Constants } from '../utils/constants';
import Jwt from 'jsonwebtoken';
export class UserService {
    private readonly _userRepository;
    constructor() {
        this._userRepository = new UserRepository(User);
    }
    fetchAll() {
       try {
        
           
       } catch (error) {
           
       }
    }

    create = async (item: IUser) : Promise<mongoose.Document<IUser>> => {
        return  await this._userRepository.create(item);
    }

    login = async (item: ILogin): Promise< LoginResponse> => {

        // before login we need to convert brcypt password into plain, 
        const user = await this.usersHavingSameEmail(item.email).then(res => res[0]);
        if (!user)
            return Promise.reject(Constants.StandardMessage.EmailNotMatchError);
        const match = await brcypt.compare(item.password, user.password);
        const token = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);
        if (match)
            return Promise.resolve({user: user, accessToken: token, refreshToken: refreshToken});
        else
            return Promise.reject(Constants.StandardMessage.PasswordNotMatchError);
    }

    public generateAccessToken = async (user: IUser): Promise<string> => {
        return (
            "Bearer " +
            Jwt.sign({ user }, Constants.Keys.TOKEN_SECRET, { expiresIn: "1d" })
          );
    }

    public generateRefreshToken = async (user: IUser): Promise<string> => {
        return (Jwt.sign({ user }, Constants.Keys.REFRESH_TOKEN_SECRET, { expiresIn: "5d" }));
    }

    public usersHavingSameEmail = async (email: string) : Promise<any | Array<mongoose.Document<IUser>>>=> {
        const users = await this._userRepository.findByEmail(email);
        return users;
    }

    public requestForgetPassword = async (userRequestForgetPassword: mongoose.Document<IUser>) => {
        // const users = await this._userRepository.requestForgetPassword(userRequestForgetPassword); 
    }

    public updateLastLoginDate = async (userId: mongoose.Types.ObjectId) => {
     return await this._userRepository.updateLastLoginDate(userId);
    }

    /**
     * Resposiable to handle , update collection value to valid: false and token will be empty 
       before new request added
     */
       updatePassword = async (userId: mongoose.Types.ObjectId, password: string): Promise<void> => {
        await this._userRepository.updatePasswordAction(userId, password);
    }
} 