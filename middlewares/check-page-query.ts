import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors';

export const checkPageQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page } = req.query;
  if (page && isNaN(Number(page))) {
    throw new BadRequestError('Page number must be a valid number');
  }

  const pageNumber: number = Number(page) || 1;

  if (!Number.isSafeInteger(pageNumber) || pageNumber < 1) {
    throw new BadRequestError('Page number must be a positive safe integer');
  }

  next();
};
