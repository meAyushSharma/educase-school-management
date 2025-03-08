import {Router} from "express";
import catchAsync from "../utils/catchAsync";
import { addSchool, listSchools, healthCheck, handleInvalidRoutes } from "../controllers/schoolManagementController";

const router = Router();

router.post('/addSchool', catchAsync(addSchool));
router.get('/listSchools', catchAsync(listSchools));
router.get('/health', healthCheck);
router.all("*", handleInvalidRoutes);

export default router;