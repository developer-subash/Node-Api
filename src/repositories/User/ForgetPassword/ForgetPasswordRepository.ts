import IWrite = require('./interfaces/IWrite');
import IRead = require('./interfaces/IRead');
import mongoose = require("mongoose");
import { IForgetPassword } from '../../../models/forgetpassword.model';
import { forgetPasswordRequestInterface } from '../../../interfaces/User';


export class ForgetPasswordRepository<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }
    /**
     * Resposiable to insert on collections
     * @param item 
     * @returns {void}
     */

    create = async (item: forgetPasswordRequestInterface): Promise<mongoose.Document<IForgetPassword>> => {
      return  await this._model.create(item);
    }

    fetchGroupByData = async (userId: mongoose.Types.ObjectId) => {

    }
    /**
     * resposiable to fetch Collections and update before insert new document in collections
     * @param userId 
     * @returns {void}
     */

    fetchAndUpdateCollectionBeforeRequest = async (userId: mongoose.Types.ObjectId): Promise<void> => {
        // let idsArray: Array<string> = [];
        let fetchedAllData: Array<any | mongoose.Document<IForgetPassword>> =
            await this._model.find({ user: userId, valid: true , token: { $ne: '' }  })
                .then(async (res) => await res);
                
        if (fetchedAllData.length) {
            fetchedAllData.forEach(async (item) => {
                await this._model.updateOne(
                    { "_id": item._id },
                    { $set: { "valid" : false, token: '' } }
                );
           });
           /** 
                idsArray = idsArray.concat(fetchedAllData.map(item => item._id));
                this._model.updateMany(
                    { _id: { $in: idsArray } },
                    { $set: { valid: false, token: '' } },
                    { multi: true }
                )
            */
        }
    }

     retrieve = async ():Promise<Array<mongoose.Document<IForgetPassword>>> => {
        const results =  await this._model.find({valid: true, activeuser: true, token: { $ne: '' } })
            .sort({'created_at': -1});
        return results;
     }

     isUserRequested = async (userId:  mongoose.Types.ObjectId) => {
        return await this._model.find(
             { user: userId, valid: true }
         );
     }
        


}



