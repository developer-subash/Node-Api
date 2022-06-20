import mongoose from "mongoose";
import { IRole } from "../interfaces/Role";
import Role from "../models/role.model";
import { RoleRepository } from "../repositories/Role/RoleRepository";


export class RoleService {

    private _roleRepository;

    constructor() {
        this._roleRepository = new RoleRepository(Role);
    }

    fetchAll = async (): Promise<Array<mongoose.Document<IRole>>> => {
        try {
            return await this._roleRepository.retrieve();
        } catch (error) {
            throw new Error("error in your request");
        }
    }

     create = async (item: IRole) : Promise<mongoose.Document<IRole>> => {
        try {
            return await this._roleRepository.create(item);    
        } catch (error) {
            throw new Error("error in your request");
        }
    }

    async delete(id: string) : Promise<Boolean> {
        try {
            return await this._roleRepository.delete(id);
        } catch (error) {
            throw new Error("error in your request");
        }
    }
}