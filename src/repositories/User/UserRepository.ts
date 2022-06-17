import  IWrite  = require('./interfaces/IWrite');
import  IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IUser } from '../../models/user.model';
import { ILogin } from '../../interfaces/User';
import  brcypt  from 'bcrypt';

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

async update(_id: mongoose.Types.ObjectId, item: T) {
   return await this._model.updateOne({ _id: _id }, item);
}
/**
 * Handle last login date in user Model
 * @param _id 
 * @returns 
 */

async updateLastLoginDate(_id: mongoose.Types.ObjectId) {
    return await this._model.updateOne(
        { _id: _id },
        { $set: { "lastLoginDate": new Date() } }
    );
}

delete(_id: string) {
    // this.find(_id);
    
}

findById(_id: string) {
    this._model.findById(_id);
}

async findByEmail(email: string): Promise<Array<mongoose.Document<IUser>>> {
   const data = await this._model.find({ email: email });
    return data;
}

login(item: ILogin) {
    
}

/**
 * responsiable for update hashed password after forgetpassword
 * @param userId 
 * @param password 
 */
updatePasswordAction = async (
    _id: mongoose.Types.ObjectId,
    password: string
) : Promise<void> => {
    const salt = await brcypt.genSalt(10);
    const hashPassword = await brcypt.hash(password, salt);
      console.log("hashPassword", hashPassword, _id);
    const test = await this._model.updateOne(
        { _id },
        { $set: {password: hashPassword} },
        { multi: true }
    )
    console.log("test", test);
} 


private toObjectId(_id: string):mongoose.Schema.Types.ObjectId {
    // return mongoose.Schema.Types.ObjectId.createFromHexString(_id)
    throw new Error("");
}

}



