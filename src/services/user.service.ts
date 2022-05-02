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
        const user = await this.usersHavingSameEmail(item.email);
        if (!user.length)
            return Promise.reject(Constants.StandardMessage.EmailNotMatchError);
        const match = await brcypt.compare(item.password, user[0].password);
        const token = await this.generateAccessToken(user[0]);
        const accessToken = await this.generateRefreshToken(user[0]);
        if (match)
            return Promise.resolve({user: user[0], token: token, accessToken: accessToken});
        else
            return Promise.reject(Constants.StandardMessage.PasswordNotMatchError);
    }

    public generateAccessToken = async (user: IUser): Promise<string> => {
        return (
            "Bearer " +
            Jwt.sign({ user }, Constants.Keys.TOKEN_SECRET, { expiresIn: "20s" })
          );
    }

    public generateRefreshToken = async (user: IUser): Promise<string> => {
        return (Jwt.sign({ user }, Constants.Keys.REFRESH_TOKEN_SECRET, { expiresIn: "5d" }));
    }

    public usersHavingSameEmail = async (email: string) : Promise<any | Array<mongoose.Document<IUser>>>=> {
        const users = await this._userRepository.findByEmail(email);
        return users;
    }
} 