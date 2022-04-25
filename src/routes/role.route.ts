import { NextFunction, Request, Response, Router } from 'express';
import Joi from 'joi';
import roleControllerInstance from './../controllers/role.controller';


  const router = Router();

  router.get('/', roleControllerInstance.fetchAll);

//   router.post('/',updateAccountSchema, roleControllerInstance.createRole);
  router.post('/', roleControllerInstance.createRole);
  router.delete('/:roleId', roleControllerInstance.deleteRole);

  
  function updateAccountSchema(req: Request, res: Response, next: NextFunction) {
    // define base schema rules
    const schemaRules = {
        title: Joi.string().required(),
        createdBy: Joi.string().required()
        // lastName: Joi.string().empty(''),
        // email: Joi.string().email().empty(''),
        // password: Joi.string().min(6).empty(''),
        // confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    };

    // conditional schema rule - only admins can update role
    // if (req.user.role === 'Admin') {
    //     schemaRules.role = Joi.string().valid('Admin', 'User').empty('');
    // }

    // create schema object with rules
    const schema = Joi.object(schemaRules);
        // make confirmPassword required IF password is present
        // .with('password', 'confirmPassword');

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
  
    if (error) {
        // on fail return comma separated errors
        // res.status('422').send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        res.status(422).send(
          error.details
        );
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}

  module.exports = router ;