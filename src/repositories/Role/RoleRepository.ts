import IWrite = require('./interfaces/IWrite');
import IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IRole } from '../../interfaces/Role';

export class RoleRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    create = async (item: IRole): Promise<mongoose.Document<IRole>> => {
        return await this._model.create(item);
    }

    retrieve = async (): Promise<Array<mongoose.Document<IRole>>> => {
        return await this._model.find({});
    }

    update = async (_id: mongoose.Types.ObjectId, item: T) => {
        return await this._model.update({ _id: _id }, item);
    }

    delete = async (_id: string | mongoose.Types.ObjectId) => {
    
    }

    findById = async (_id: mongoose.Types.ObjectId ) => {
        return await this._model.findById(_id);
    }


    private toObjectId(_id: mongoose.Types.ObjectId ): mongoose.Schema.Types.ObjectId {
        // return mongoose.Schema.Types.ObjectId.createFromHexString(_id)
        throw new Error("");
    }
}

