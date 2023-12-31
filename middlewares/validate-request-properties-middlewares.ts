import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ConflictError } from '../errors';

export const validateCoordinates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { latitude, longitude } = req.body;

  if (latitude && !longitude) {
    throw new BadRequestError('Add longitude!');
  }

  if (!latitude && longitude) {
    throw new BadRequestError('Add latitude!');
  }

  next();
};

export const validateQueryPage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page } = req.query;

  if (page && isNaN(Number(page))) {
    throw new BadRequestError('Page number must be a valid number');
  }

  const pageNumber = Number(page) || 1;

  if (!Number.isSafeInteger(pageNumber) || pageNumber < 1) {
    throw new BadRequestError('Page number must be a positive safe integer');
  }

  next();
};

export const hasPurchasesProperty = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { purchases } = req.body;

  if (purchases?.length) {
    throw new ConflictError('You can not add purchases!');
  }

  next();
};

export const hasCompanyOrUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { createdBy, company } = req.body;

  if (createdBy || company) {
    throw new ConflictError('You can not add company or user to the entity!');
  }

  next();
};
