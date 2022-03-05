import { Router } from 'express';

import  userControllerInstance  from '../controllers/user.controller';



  const router = Router();

  router.get('/', userControllerInstance.fetchAll);

  router.post('/', userControllerInstance.createUser);

  module.exports = router ;