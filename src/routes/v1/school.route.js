import express, { Router } from 'express';
import schoolContoller from '../../controllers/school.controller.js';

const school = Router();

school.post('/addSchool', schoolContoller.createSchool);
school.get('/listSchools', schoolContoller.findNearby);

export default school;
