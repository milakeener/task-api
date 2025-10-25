import { param } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .notEmpty()
    .withMessage('ID must be a number')
    .bail()
    .isInt()
    .withMessage('ID must be a number'),
  checkValidationResults,
];

export default validateId;
