import mongoose from "mongoose";
import { IPermission } from "../interfaces/Permission";
import { IRole } from "../interfaces/Role";
import Permission from "../models/permission.model";

import { PermissionRepository } from '../repositories/Permission/PermissionRepository';


export class PermissionService {

    private _permissionRepository;

    constructor() {
        this._permissionRepository = new PermissionRepository(Permission);
    }

    fetchAll = async (): Promise<Array<mongoose.Document<IRole>>> => {
        try {
            return await this._permissionRepository.retrieve();
        } catch (error) {
            throw new Error("error in your request");
        }
    }

     create = async (item: IPermission) : Promise<mongoose.Document<IPermission>> => {
        try {
            return await this._permissionRepository.create(item);    
        } catch (error) {
            console.log("error", error);
            throw new Error("error in your request");
        }
    }

    delete = async (id: string) : Promise<Boolean> => {
        try {
            return await this._permissionRepository.delete(id);
        } catch (error) {
            throw new Error("error in your request");
        }
    }

    update = async (id: string, item: IPermission) :Promise<mongoose.Document<IPermission>> => {
        try {
            return await this._permissionRepository.update(id,item);    
        } catch (error) {
            throw new Error("error in your request");
        }
    }
}