import Banner, { IBanner } from '../models/banner.model';
import { BannerRepository } from '../repositories/Banner/BannerRepository';
class BannerService {
    private _bannerRepository;

    constructor() {
        this._bannerRepository = new BannerRepository(Banner)
    }


    create(item: IBanner, callback: (error: any, result: any) => void) {
        this._bannerRepository.create(item, callback);
    }

    fetchAll(callback:(error:any, result:any) => void) {
        this._bannerRepository.retrieve(callback);
    }

    delete(id: string, callback:(error:any, result:any) => void) {
        this._bannerRepository.delete(id,callback);
    }

}

const bannerServiceInstance = new BannerService();
export default bannerServiceInstance;