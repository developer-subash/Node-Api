import Role, { IRole } from "../models/role.model";
import { RoleRepository } from "../repositories/Role/RoleRepository";


class RoleService {

    private _roleRepository;

    constructor() {
        this._roleRepository = new RoleRepository(Role);
    }

    fetchAll(callback: (error: any, result: any) => void) {
        try {
            this._roleRepository.retrieve(callback);
        } catch (error) {
            throw new Error("error in your request");
        }
    }

    async create(item: IRole, callback: (error: any, result: any) => void) {
        try {
            this._roleRepository.create(item, callback);
        } catch (error) {
            throw new Error("error in your request");
        }
    }
}

const roleServiceInstance = new RoleService();
export default roleServiceInstance;