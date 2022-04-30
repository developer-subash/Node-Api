import Joi from 'joi';
import { Schema } from 'mongoose';

  const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Please fill valid email address`],
    },
    password: {
        type: String,
        required: true,
        // validatePassword(password: string): 
    },
    gender: {
        type: String,
        required: true,
    }
  }, {timestamps: true}
  ); 

  let strongPasswordRegex  = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
  const UserValidationSchema = Joi.object({
    firstName: Joi.any().required().messages({
        "string.empty": `firstName cannot be an empty field`,
        "any.required": `firstName is a required.`,

    }),
    middleName: Joi.any(),
    lastName: Joi.any().required().messages({
        "string.empty": `lastName cannot be an empty field`,
        "any.required": `lastName is a required.`,
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'de', 'org'] } })
    .required().messages({
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email is a required.`,
        "string.email": "Email must be email type"
    }),
 
    password: Joi.string().min(7).required().regex(strongPasswordRegex).strict().messages({
        'string.pattern.base': `Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum ten in length`,
        'string.empty': `Password Cannot Be Empty`,
        'string.required': `Password Cannot Be Empty`,
    }),


    confirmPassword : Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': `Confirm Password is required`,
        'string.empty': `Confirm Password Cannot Be Empty`,
        'any.only': `Confirm Password Must Same as Password`
    }),

    gender: Joi.string().valid('MALE', 'FEMALE','OTHER').uppercase().required().messages({
        'any.required': `Geneder is required`,
        'string.empty': `Geneder cannot be empty`,
        'any.only': `Gender must be one of [MALE, FEMALE, OTHER]`
    })
   
});

export {
    UserValidationSchema,
    UserSchema
}


//   const RoleValidationSchema = {
//       firstName: { 
//           notEmpty: true,
//           errorMessage: "First Name cannot be empty"
//        },
//       middleName: { 
//           notEmpty: true,
//           errorMessage: "Middle Name cannot be empty"
//       },
//       lastName: { 
//           notEmpty: true,
//           errorMessage: "Last Name cannot be empty"
//       },
//       email: { 
         
//       },
//       gender: { 
//           type: String, 
//           enum: ['MALE', 'FEMALE', 'OTHERS'], 
//           default: 'MALE' 
//       },
//       Role: { 
//           type: mongoose.Schema.Types.ObjectId, 
//           required: true, ref: '' 
//       }
//   }