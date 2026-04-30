import createCustomLogger from '../config/loggerConfig.js';
import SchoolRepository from '../repository/school.repository.js';

const logger = createCustomLogger('school_service');

const repository = new SchoolRepository();

async function addSchool(data) {
  try {
    const response = await repository.createSchool(data);
    logger.info('successfully added school');
    return response;
  } catch (error) {
    console.log(error);
    logger.error('error occour', error);
    throw error;
  }
}

async function findAllSchool(lat, long, radius) {
  try {
    const response = await repository.findNearby(lat, long, radius);
    logger.info('Successfully find schools');
    return response;
  } catch (error) {
    console.log(error);
    logger.error('error occour', error);
    throw error;
  }
}

export default {
  addSchool,
  findAllSchool,
};
