import mongoose = require("mongoose");
import { forgetPasswordRequestInterface } from "../../../../interfaces/User";
interface Write<T> {
    create: (item:forgetPasswordRequestInterface) => void;
    
}

export = Write;