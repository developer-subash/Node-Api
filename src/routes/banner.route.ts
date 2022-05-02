import { Router } from 'express';
import Joi from 'joi';
import IBannerController from '../controllers/banner.controller';
import { verifyLogin } from '../middlewares/validations/category.validation';
const upload = require('../utils/multer');
  const router = Router();

  router.post('/',verifyLogin.verifyToken, verifyLogin.checkValidToken, IBannerController.createBanner);
  router.post('/upload',upload.single('image'), IBannerController.uploadImg);
  router.get('/',verifyLogin.verifyToken,verifyLogin.checkValidToken, IBannerController.fetchAll);



  module.exports = router ;