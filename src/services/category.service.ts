import Category, { ICategory } from '../models/category.model';
import { CategoryRepository } from './../repositories/Category/CategoryRepository';
class CategoryService {
    private _categoryRepository;

    constructor() {
        this._categoryRepository = new CategoryRepository(Category)
    }


    create(item: ICategory, callback: (error: any, result: any) => void) {
        this._categoryRepository.create(item, callback);
    }

    fetchAll(callback:(error:any, result:any) => void) {
        this._categoryRepository.retrieve(callback);
    }

    delete(id: string, callback:(error:any, result:any) => void) {
        this._categoryRepository.delete(id,callback);
    }

}

const categoryServiceInstance = new CategoryService();
export default categoryServiceInstance;