import createCustomLogger from '../config/loggerConfig.js';
import schoolService from '../services/school.service.js';

const logger = createCustomLogger('School_controller');

async function createSchool(req, res) {
  try {
    const response = await schoolService.addSchool({
      name: req.body.name,
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    });

    logger.info('Successfuly created Data');
    return res.status(201).json({
      success: true,
      message: 'School added',
      error: {},
      data: response,
    });
  } catch (error) {
    console.log(error);
    logger.error('error occour', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Bad Request',
        error: error.message,
        data: {},
      });
    }
  }
}

async function findNearby(req, res) {
  try {
    const { lat, long, rad } = req.query;

    const latitude = parseFloat(lat);
    const longitude = parseFloat(long);
    const radius = parseFloat(rad);

    console.log(latitude, longitude, radius);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(radius)) {
      return res.status(400).json({
        success: false,
        message: 'latitude, longitude and radius must be valid numbers',
        error: 'latitude, longitude and radius must be valid numbers',
        data: {},
      });
    }
    const response = await schoolService.findAllSchool(latitude, longitude, radius);
    return res.status(200).json({
      success: true,
      message: 'Fetch all successfully',
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Something went wroung',
      error: error,
      data: {},
    });
  }
}

export default {
  createSchool,
  findNearby,
};
