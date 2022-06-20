import mongoose from "mongoose";

interface Read<T> {
  retrieve: ()=> void;
  findById: (id: mongoose.Types.ObjectId ) => void;
} 

export = Read;