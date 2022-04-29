import { User } from './User';
import { ICategory } from './Category';
export interface IBanner extends Document  {
    uri: string;
    title: string;
    imageUrl: string;
    price: number;
    tags: string;
    categories:Array<ICategory>;
    // createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}