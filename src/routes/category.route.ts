import { Router } from 'express';
import ICategoryController from '../controllers/category.controller';
  const router = Router();

  router.post('/',ICategoryController.createCategory);
  router.get('/',ICategoryController.fetchAll);
  router.delete('/:catId',ICategoryController.deleteCategory);



  module.exports = router;