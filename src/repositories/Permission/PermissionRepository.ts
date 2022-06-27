import IWrite = require('./interfaces/IWrite');
import IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");

import { UtilsService } from '../../services/utils.service';
import { IPermission } from '../../interfaces/Permission';


export class PermissionRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private readonly _model:  mongoose.Model<mongoose.Document<IPermission>>;
    private readonly _utilityServiceInstance;
    constructor(schemaModel:  mongoose.Model<mongoose.Document<IPermission>>) {
        this._model = schemaModel;
        this._utilityServiceInstance = new UtilsService();
    }

    create = async (item: IPermission): Promise<mongoose.Document<IPermission>> => {
        return await this._model.create(item);
    }

    retrieve = async (): Promise<Array<mongoose.Document<IPermission>>> => {
        const data = await this._model.find({});
        return data;
    }

    update = async(_id: string, item: IPermission): Promise<any | mongoose.Model<mongoose.Document<IPermission>>> => {
        try {
            return await this._model.findOneAndUpdate({ _id: _id }, item, {upsert: true});  
        } catch (error) {
            throw new Error("error in your request");
        }
        
    }

    delete = async (_id: string ):  Promise<Boolean> => {
        const singleData = await this.findById(_id);
        if (!this._utilityServiceInstance.isEmpty(singleData)) {
            await this._model.deleteOne({ _id: _id });
            return true;
        }

        throw new Error("Delete Id Request is not in Permission Collections");
    }

    findById = async (_id: string ) => {
        return await this._model.findById(_id);
    }


    private toObjectId(_id: mongoose.Types.ObjectId ): mongoose.Schema.Types.ObjectId {
        // return mongoose.Schema.Types.ObjectId.createFromHexString(_id)
        throw new Error("");
    }
}

