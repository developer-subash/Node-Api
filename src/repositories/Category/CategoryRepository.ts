import  IWrite  = require('./interfaces/IWrite');
import  IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { ICategory } from '../../models/category.model';

export class CategoryRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
}

async create(item: ICategory): Promise<mongoose.Document<ICategory>> {
  const data = await this._model.create(item);
  return data;
}

async retrieve(): Promise<Array<mongoose.Document<ICategory>>> {
    const data= await this._model.find({});
    return data;
}

update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.updateOne({ _id: _id }, item, callback);
}

delete(_id:string) {
    const singleData =  this.findById(_id);
        // if(!!singleData) 
       
}

findById(_id: string): Promise<ICategory> {
    return this._model.find({_id}) as any;
}


private toObjectId(_id: string):mongoose.Types.ObjectId  {
    return new mongoose.Types.ObjectId(_id);
}



}