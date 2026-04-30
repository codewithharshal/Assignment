import express, { Router } from 'express';
import server from './server.route.js';
import school from './school.route.js';

const router = Router();

router.use('/server', server);
router.use('/schools', school);

export default router;
