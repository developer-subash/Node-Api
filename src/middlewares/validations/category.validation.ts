import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import CategoryValidationSchema from "../../schemas/category.schema";

const categoryValidation = function(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object(CategoryValidationSchema);

}