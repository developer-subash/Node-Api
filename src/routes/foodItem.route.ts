import { Router } from 'express';
import IFoodItemController from '../controllers/foodItem.controller';
import { verifyLogin } from '../middlewares/validations/category.validation';
const upload = require('../utils/multer');
  const router = Router();

  router.post('/',verifyLogin.verifyToken, verifyLogin.checkValidToken, IFoodItemController.create);
  // router.post('/upload',upload.single('image'), IFoodItemController.uploadImg);
  router.get('/',verifyLogin.verifyToken,verifyLogin.checkValidToken, IFoodItemController.fetchAll);
  router.get('/findById',verifyLogin.verifyToken,verifyLogin.checkValidToken, IFoodItemController.findById);
  router.delete('/:BannerId',verifyLogin.verifyToken,verifyLogin.checkValidToken, IFoodItemController.deleteBanner);



  module.exports = router ;