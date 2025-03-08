import {Router} from "express";
import catchAsync from "../utils/catchAsync";
import { addSchool } from "../controllers/schoolManagementController";

const router = Router();

router.post('/addSchool', catchAsync(addSchool))

export default router;