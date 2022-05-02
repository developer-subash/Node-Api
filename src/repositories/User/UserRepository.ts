import  IWrite  = require('./interfaces/IWrite');
import  IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IUser } from '../../models/user.model';
import { ILogin } from '../../interfaces/User';

export class UserRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
}

async create(item: IUser): Promise<mongoose.Document<IUser>> {
   return await this._model.create(item);
}

async retrieve(): Promise<Array<mongoose.Document<IUser>>>{
    const data = await this._model.find({});
    return data;
}

update(_id: mongoose.Types.ObjectId, item: T) {
   return this._model.update({ _id: _id }, item);
}

delete(_id: string) {
    // this.find(_id);
    
}

findById(_id: string) {
    this._model.findById(_id);
}

async findByEmail(email: string): Promise<Array<mongoose.Document<IUser>>> {
   const data = await this._model.find({ email: email })
    return data;
}

login(item: ILogin) {
    
}


private toObjectId(_id: string):mongoose.Schema.Types.ObjectId {
    // return mongoose.Schema.Types.ObjectId.createFromHexString(_id)
    throw new Error("");
}

}



