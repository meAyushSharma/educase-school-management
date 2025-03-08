import {Router} from "express";
import catchAsync from "../utils/catchAsync";
import { addSchool, listSchools, healthCheck, handleInvalidRoutes, crashTest } from "../controllers/schoolManagementController";

const router = Router();


router.post('/addSchool', catchAsync(addSchool));
router.get('/listSchools', catchAsync(listSchools));


router.get('/health', healthCheck);

/* crash test route for docker restart policy testing */
// router.get('/crash', crashTest);

router.all("*", handleInvalidRoutes);

export default router;