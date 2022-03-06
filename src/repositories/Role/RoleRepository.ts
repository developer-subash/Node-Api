import  IWrite  = require('./interfaces/IWrite');
import  IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");

export class RoleRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
}

create(item: T, callback: any): void {
    // console.log("hrllo from repository class",  this._model);
    this._model.create(item, callback);

}

retrieve(callback: (error: any, result: mongoose.Document[]) => void) {
    this._model.find({}, callback);
}

update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.update({ _id: _id }, item, callback);
}

delete(_id: string, callback: (error: any, result: any) => void) {
    // this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    throw new Error("");
    
}

findById(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
}


private toObjectId(_id: string):mongoose.Schema.Types.ObjectId {
    // return mongoose.Schema.Types.ObjectId.createFromHexString(_id)
    throw new Error("");
}

}



