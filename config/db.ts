import  mongoose  from "mongoose";
import { ConnectionOptions } from "tls";
// const mongoURI: string = "mongodb+srv://subash:Subash$123@cluster0.btxtj.mongodb.net/lunch_db?retryWrites=true&w=majority";
// const mongoURI: string = `mongodb://localhost:27017/nodeTest`;
mongoose.connect("mongodb://localhost:27017/nodeTest", {
    useNewUrlParser: true
} as ConnectionOptions,
(err: any) => {
    if(!err) {
        // console.log('connection succed');
    } else {
        console.log('Error occured'+ err);
    }
});