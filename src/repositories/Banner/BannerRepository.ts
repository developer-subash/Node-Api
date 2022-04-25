import  IWrite  = require('./interfaces/IWrite');
import  IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IBanner } from '../../models/banner.model';

export class BannerRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
}

create(item: IBanner, callback: any): void {
    this._model.create(item, callback);
}

retrieve(callback: (error: any, result: mongoose.Document[]) => void) {
    this._model.find({})
    .populate('categories', `_id title`).
    exec(function (err, result) {
        if (err) return err;
        callback(null, result);
      });
}

update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.updateOne({ _id: _id }, item, callback);
}

delete(_id:string, callback: (error: any, result: any) => void) {
    this.findById(_id, (error, result) => {
        if(result) 
         this._model.deleteOne({ _id: _id }, (err) => callback(err, null));
        else 
        callback(`Selected Document is N't Available In Collection`,null);
    });
}

findById(_id: string, callback: (error: T, result: T) => void) {
    this._model.findById(_id, callback);
}



}