import { Router } from 'express';
import Joi from 'joi';

import  userControllerInstance  from '../controllers/user.controller';
import {verifyLogin} from '../middlewares/validations/category.validation'
import userForgetPasswordControllerInstance from './../controllers/userforgetpassword.controller';


  const router = Router();

  router.get('/', userControllerInstance.fetchAll);

  router.post('/', userControllerInstance.createUser);
  router.post('/login',verifyLogin.usersHavingSameEmail, userControllerInstance.login);
  router.post('/refreshToken', userControllerInstance.generateAccessToken);
  router.post('/requestForgetPassword', userForgetPasswordControllerInstance.requestForgetPassword);
  router.post('/updatePasswordAction', userForgetPasswordControllerInstance.updatePassword);



  module.exports = router ;