'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const areas = [
      { name: 'Dharampeth', lat: 21.135, lng: 79.085 },
      { name: 'Sitabuldi', lat: 21.146, lng: 79.083 },
      { name: 'Manish Nagar', lat: 21.09, lng: 79.05 },
      { name: 'Trimurti Nagar', lat: 21.125, lng: 79.11 },
      { name: 'Wardhaman Nagar', lat: 21.17, lng: 79.12 },
      { name: 'Hingna', lat: 21.09, lng: 78.98 },
      { name: 'Mankapur', lat: 21.18, lng: 79.06 },
      { name: 'Jaripatka', lat: 21.19, lng: 79.1 },
      { name: 'Besa', lat: 21.07, lng: 79.02 },
      { name: 'Kamptee', lat: 21.23, lng: 79.2 },
    ];

    let idCounter = 1;
    const schools = [];

    areas.forEach((area) => {
      for (let i = 1; i <= 5; i++) {
        schools.push({
          id: idCounter++,
          name: `${area.name}_School_${i}`,
          address: `${area.name}, Nagpur`,
          latitude: area.lat + i * 0.001, // small cluster variation
          longitude: area.lng + i * 0.001, // small cluster variation
          createdAt: now,
          updatedAt: now,
        });
      }
    });

    await queryInterface.bulkInsert('schools', schools, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schools', null, {});
  },
};
