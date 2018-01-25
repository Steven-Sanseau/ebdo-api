'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Address', {
      fields: ['client_id', 'type_address']
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
