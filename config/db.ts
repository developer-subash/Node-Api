import  mongoose  from "mongoose";
import { ConnectionOptions } from "tls";

mongoose.connect('mongodb://localhost:27017/nodeTest', {
    useNewUrlParser: true
} as ConnectionOptions,
(err: any) => {
    if(!err) {
        // console.log('connection succed');
    } else {
        console.log('Error occured'+ err);
    }
});