import Banner, { IBanner } from '../models/banner.model';
import { BannerRepository } from '../repositories/Banner/BannerRepository';
export class BannerService {
    private _bannerRepository;

    constructor() {
        this._bannerRepository = new BannerRepository(Banner)
    }


    create(item: IBanner) {
        this._bannerRepository.create(item);
    }

   async fetchAll():Promise<Array<IBanner>> {
        const data = await this._bannerRepository.retrieve();
        // other works
        return data;
    }

    delete(id: string, callback:(error:any, result:any) => void) {
        this._bannerRepository.delete(id,callback);
    }

}