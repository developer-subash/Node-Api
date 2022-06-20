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
        return await this._roleRepository.retrieve();
    }

     create = async (item: IRole) => {
         return await this._roleRepository.create(item);
    }

    async delete(id: string | mongoose.Types.ObjectId) {
        try {
            return await this._roleRepository.delete(id);
        } catch (error) {
            throw new Error("error in your request");
        }
    }
}