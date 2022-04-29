import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/user.model';
import { UserRepository } from '../repositories/User/UserRepository';
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
        const data =  this._userRepository.create(item);
        return data;
    }
} 