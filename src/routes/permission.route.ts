import { Router } from 'express';
import permissionControllerInstance from '../controllers/permission.controller';
import path from 'path';

import {verifyLogin} from '../middlewares/validations/category.validation'
  const router = Router();
  const app = require('express');

  router.get('/',verifyLogin.verifyToken, verifyLogin.checkValidToken, permissionControllerInstance.fetchAll);
  router.post('/',verifyLogin.verifyToken, verifyLogin.checkValidToken, permissionControllerInstance.createPermission);
  router.delete('/:permissionId',verifyLogin.verifyToken, verifyLogin.checkValidToken, permissionControllerInstance.deletePermission);
  
  router.get('/manageRolePermission', permissionControllerInstance.manageRolePermission);

  module.exports = router;