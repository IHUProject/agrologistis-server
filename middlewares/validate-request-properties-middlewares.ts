import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors';
import { ForbiddenError } from '../errors/forbidden';
import { Roles } from '../interfaces/enums';

export const checkCoordinates = (
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

export const checkRoleIfIsOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role } = req.body;
  if (role! === Roles.OWNER) {
    throw new ForbiddenError('You can not make an employ owner!');
  }
  next();
};