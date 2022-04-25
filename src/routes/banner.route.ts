import { Router } from 'express';
import Joi from 'joi';
import IBannerController from '../controllers/banner.controller';
const upload = require('../utils/multer');
  const router = Router();

  router.post('/', IBannerController.createBanner);
  router.post('/upload',upload.single('image'), IBannerController.uploadImg);
  router.get('/', IBannerController.fetchAll);



  module.exports = router ;