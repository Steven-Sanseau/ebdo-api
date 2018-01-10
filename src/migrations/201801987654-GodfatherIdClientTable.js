'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Client', 'id_client_god_father', {
      type: Sequelize.INTEGER
    })
    queryInterface.addIndex('Client', ['email'], {
      indexName: 'email_client',
      indicesType: 'UNIQUE'
    })
    queryInterface.addIndex('Client', ['aboweb_client_id'], {
      indexName: 'aboweb_client_id',
      indicesType: 'UNIQUE'
    })
    return queryInterface
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
