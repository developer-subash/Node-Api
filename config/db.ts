import  mongoose  from "mongoose";
import { ConnectionOptions } from "tls";
const mongoURI: string = "mongodb+srv://subash:Subash$123@cluster0.btxtj.mongodb.net/lunch_db?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
    useNewUrlParser: true
} as ConnectionOptions,
(err: any) => {
    if(!err) {
        // console.log('connection succed');
    } else {
        console.log('Error occured'+ err);
    }
});