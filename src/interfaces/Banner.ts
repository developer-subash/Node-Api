import { User } from './User';
import { ICategory } from './Category';
import mongoose from 'mongoose';
export interface IFoodItem extends Document  {
    title: string;
    imageUrl: string;
    price: number;
    tags: string;
    categories:Array<ICategory>;
    // createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IFoodItemResponse {
    nextPage?: number,
    prevPage?: number,
    data?: Array<mongoose.Document<any | IFoodItem>>,
    perPage?: number,
    currentPage?: number,
    totalPages?: number,
    totalElements?: number,
}

export interface PaginationUrlParams{
        page: number;
        limit: number;
}