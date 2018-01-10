'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('Address', { unique: true, fields: ['type_address', 'client_id'] })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
