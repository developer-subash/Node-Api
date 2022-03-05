import { Router } from 'express';
import roleControllerInstance from './../controllers/role.controller';

  const router = Router();

  router.get('/', roleControllerInstance.fetchAll);

  router.post('/', roleControllerInstance.createRole);

  module.exports = router ;