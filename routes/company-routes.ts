import express from 'express';
import { authorizePermissions } from '../middlewares/auth-middlewares';
import { CompanyController } from '../controllers/company-controller';
import { Roles } from '../interfaces/enums';
import {
  hasExistingCompanyRelations,
  isCompanyExists,
} from '../middlewares/company-middlewares';
import multer, { memoryStorage } from 'multer';
import { validateCoordinates } from '../middlewares/validate-request-properties-middlewares';

const companyController = new CompanyController();
const router = express.Router();

const storage = memoryStorage();
const upload = multer({ storage: storage });

router.get(
  '/get-company',
  authorizePermissions(Roles.SENIOR_EMPLOY, Roles.OWNER, Roles.EMPLOY),
  companyController.getCompany.bind(companyController)
);
router.post(
  '/create-company',
  upload.single('logo'),
  authorizePermissions(Roles.UNCATEGORIZED),
  hasExistingCompanyRelations,
  validateCoordinates,
  companyController.createCompany.bind(companyController)
);
router.delete(
  '/:companyId/delete-company',
  authorizePermissions(Roles.OWNER),
  isCompanyExists,
  companyController.deleteCompany.bind(companyController)
);
router.patch(
  '/:companyId/update-company',
  upload.single('logo'),
  authorizePermissions(Roles.SENIOR_EMPLOY, Roles.OWNER),
  hasExistingCompanyRelations,
  isCompanyExists,
  validateCoordinates,
  companyController.updateCompany.bind(companyController)
);

export default router;
