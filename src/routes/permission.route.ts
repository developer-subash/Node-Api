import { Router } from 'express';
import permissionControllerInstance from '../controllers/permission.controller';

import {verifyLogin} from '../middlewares/validations/category.validation'
  const router = Router();

  router.get('/',verifyLogin.verifyToken, verifyLogin.checkValidToken, permissionControllerInstance.fetchAll);
  router.post('/',verifyLogin.verifyToken, verifyLogin.checkValidToken, permissionControllerInstance.createPermission);
  
  module.exports = router ;