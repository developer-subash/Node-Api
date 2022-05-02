import { Router } from 'express';
import Joi from 'joi';

import  userControllerInstance  from '../controllers/user.controller';
import {verifyLogin} from '../middlewares/validations/category.validation'


  const router = Router();

  router.get('/', userControllerInstance.fetchAll);

  router.post('/', userControllerInstance.createUser);
  router.post('/login',verifyLogin.usersHavingSameEmail, userControllerInstance.login);
  router.post('/refreshToken', userControllerInstance.generateAccessToken);



  module.exports = router ;