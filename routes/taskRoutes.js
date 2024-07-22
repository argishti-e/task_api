import { Router } from 'express';

import controller from "../controllers/taskController.js";

const router = Router();

router.get('/', controller.getTasks);
router.post('/create', controller.createTask);

export default router;
