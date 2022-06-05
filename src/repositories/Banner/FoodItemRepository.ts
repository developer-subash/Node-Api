import IWrite = require('./interfaces/IWrite');
import IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IFoodItem } from '../../models/foodItem.model';

export class FootItemRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document<IFoodItem>>;

    constructor(schemaModel: mongoose.Model<mongoose.Document<IFoodItem>>) {
        this._model = schemaModel;
    }

    async create(item: IFoodItem): Promise<mongoose.Document<IFoodItem>> {
        const data = await (await this._model.create(item)).populate('categories', `_id title`);
        return data;
    }

    async retrieve(page: number, limit: number, sortKey: string, sortOrder: string): Promise<Array<mongoose.Document<IFoodItem>>> {
        const skipIndex = (page - 1) * limit;
        const results = this._model.find({})
            .sort({ [sortKey]: sortOrder })
            .limit(limit)
            .skip(skipIndex)
            .populate('categories', `_id title`);
        return results;
    }

    update(_id: mongoose.Types.ObjectId, item: T) {
        this._model.updateOne({ _id: _id }, item);
    }

    async delete(_id: string) {
        const data = await this.findById(_id);
        console.log("data", data);
        if (data)
          return await this._model.deleteOne({ _id: _id });
    }

    async findById(_id: string): Promise<Array<mongoose.Document<IFoodItem>>> {
       return await this._model.find({_id: _id}).populate('categories', `_id title`);
    }

    async getCollectionCount(): Promise<number> {
        const data = await this._model.countDocuments();
        return data;
    }


}