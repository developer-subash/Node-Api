import IWrite = require('./interfaces/IWrite');
import IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IRole } from '../../interfaces/Role';
import { UtilsService } from '../../services/utils.service';

export class RoleRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private readonly _model: mongoose.Model<mongoose.Document>;
    private readonly _utilityServiceInstance;
    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
        this._utilityServiceInstance = new UtilsService();
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

    delete = async (_id: string ):  Promise<Boolean> => {
        const singleData = await this.findById(_id);
        if (this._utilityServiceInstance.isEmpty(singleData)) {
            await !!this._model.deleteOne({ _id: _id });
            return true;
        }

        throw new Error("Delete Id Request is not in Role Collections");
    }

    findById = async (_id: string ) => {
        return await this._model.findById(_id);
    }


    private toObjectId(_id: mongoose.Types.ObjectId ): mongoose.Schema.Types.ObjectId {
        // return mongoose.Schema.Types.ObjectId.createFromHexString(_id)
        throw new Error("");
    }
}

