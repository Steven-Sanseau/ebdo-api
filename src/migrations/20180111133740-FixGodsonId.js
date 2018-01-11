'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Checkout', 'godson_id', {
      type: Sequelize.INTEGER
    }).then(() => queryInterface.addConstraint('Checkout', ['godson_id'], {
        type: 'FOREIGN KEY',
        name: 'godson_id_fkey',
        references: {
          table: 'Client',
          field: 'client_id'
        },
        onDelete: 'set null',
        onUpdate: 'set null'
      })
    )
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
