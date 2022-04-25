import mongoose from 'mongoose';
import { IRole } from '../models/role.model';
const {body, checkSchema, validationResult} = require('express-validator');
/**
 * Interface to model the Role Schema for TypeScript.
 * @param firstName:string
 * @param middleName:string
 * @param lastName:string
 * @param email:string
 * @param email:string
 * @param gender:string
 * @param Role: string
 */
 export interface IUser extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    gender: string;
    role: IRole["_id"];
  }



  const RoleValidationSchema = {
      firstName: { 
          notEmpty: true,
          errorMessage: "First Name cannot be empty"
       },
      middleName: { 
          notEmpty: true,
          errorMessage: "Middle Name cannot be empty"
      },
      lastName: { 
          notEmpty: true,
          errorMessage: "Last Name cannot be empty"
      },
    //   email: { 
    //       custom: {
    //           options: value => {
                  
    //           }
    //       }
    //   },
      gender: { 
          type: String, 
          enum: ['MALE', 'FEMALE', 'OTHERS'], 
          default: 'MALE' 
      },
      Role: { 
          type: mongoose.Schema.Types.ObjectId, 
          required: true, ref: '' 
      }
  }