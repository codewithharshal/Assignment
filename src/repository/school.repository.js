import createCustomLogger from '../config/loggerConfig.js';
import db from '../models/index.js';
import Sequelize, { Op } from 'sequelize';

const logger = createCustomLogger('school_repository');

export default class SchoolRepository {
  async createSchool(data) {
    try {
      const school = await db.school.create(data);
      logger.info('Data created');
      return school;
    } catch (error) {
      throw error;
    }
  }

  async findNearby(lat, lng, radius) {
    const earthRadius = 6371;
    const range = radius / 111;

    const distanceFormula = `
      ${earthRadius} * acos(
        cos(radians(${lat})) *
        cos(radians(latitude)) *
        cos(radians(longitude) - radians(${lng})) +
        sin(radians(${lat})) *
        sin(radians(latitude))
      )
    `;
    try {
      const schools = await db.school.findAll({
        attributes: {
          include: [[Sequelize.literal(distanceFormula), 'distance']],
        },
        where: {
          latitude: {
            [Op.between]: [lat - range, lat + range],
          },
          longitude: {
            [Op.between]: [lng - range, lng + range],
          },
          [Op.and]: Sequelize.literal(`${distanceFormula} <= ${radius}`),
        },

        order: [[Sequelize.literal('distance'), 'ASC']],
      });
      logger.info('data fetech');
      return schools;
    } catch (error) {
      console.log(error);
      logger.error('error occour', error);
      throw error;
    }
  }
}
