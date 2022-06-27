interface Read<T> {
  retrieve: ()=> void;
  findById: (id: string ) => void;
} 

export = Read;