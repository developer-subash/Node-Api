import mongoose from 'mongoose';
import { IFoodItemResponse } from '../interfaces/Banner';
import FoodItem, { IFoodItem } from '../models/foodItem.model';
import { FootItemRepository } from '../repositories/Banner/FoodItemRepository';
export class FoodItemService {
    private _foodItemRepository;

    constructor() {
        this._foodItemRepository = new FootItemRepository(FoodItem);
    }


    async create(item: IFoodItem): Promise<mongoose.Document<IFoodItem>> {
       const data = await this._foodItemRepository.create(item);
        return data;
    }

   async fetchAll(page: number, limit: number, sortKey: string, sortOrder: string): Promise<IFoodItemResponse> {
        const data = await this._foodItemRepository.retrieve(page, limit, sortKey, sortOrder);
        const countCollection: number = await this._foodItemRepository.getCollectionCount();

        // other works
        const startIndex = (page-1)*limit;
        const lastIndex = page*limit;
        const result : IFoodItemResponse ={};
        const totalPages : number = Math.ceil(countCollection/limit);
        const totalElement: number = countCollection;
        if(startIndex >= 0) {
            result.currentPage = page;
            result.nextPage = page+1;
            result.perPage = limit;
            result.data = data;
            result.totalPages = totalPages;
        }

        if(lastIndex < countCollection) {
            result.prevPage = page-1;
            result.currentPage = page;
            result.perPage = limit;
            result.data = data;
            result.totalPages = totalPages;
        }
        result.totalElements = totalElement;
        return result;
    }

    async delete(id: string) {
       return await this._foodItemRepository.delete(id);
    }

    async findById(id: string) :Promise<Array<mongoose.Document<IFoodItem>>> {
        return await this._foodItemRepository.findById(id);
    }

}