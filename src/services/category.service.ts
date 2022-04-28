import mongoose from 'mongoose';
import Category, { ICategory } from '../models/category.model';
import { CategoryRepository } from './../repositories/Category/CategoryRepository';
export class CategoryService {
    private _categoryRepository;

    constructor() {
        this._categoryRepository = new CategoryRepository(Category)
    }


    async create(item: ICategory): Promise<mongoose.Document<ICategory>> {
        const data = await this._categoryRepository.create(item);
        return data;
    }

    async fetchAll() : Promise<Array<mongoose.Document<ICategory>>> {
        return await this._categoryRepository.retrieve();
    }

    async delete(id: string) {
       return await this._categoryRepository.delete(id);
    }

}