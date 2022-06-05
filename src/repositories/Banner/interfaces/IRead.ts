interface Read<T> {
  retrieve: (page: number, limit: number, sortKey: string, sortOrder: string )=> void;
  findById: (_id: string) => void;    
} 

export = Read;