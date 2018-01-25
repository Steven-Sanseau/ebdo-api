'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {},

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Address', {
      unique: true,
      fields: ['type_address', 'client_id']
    })
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
