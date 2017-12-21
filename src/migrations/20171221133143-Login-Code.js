'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Clients', 'login_code', {
      type: Sequelize.INTEGER,
    })
    queryInterface.addColumn('Clients', 'login_code_created_at', {
      type: Sequelize.DATE,
    })
    return queryInterface;
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
