'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Charge" ("charge_id"  SERIAL , "stripe_charge_return" JSON, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "checkout_id" INTEGER REFERENCES "Checkout" ("checkout_id") ON DELETE SET NULL ON UPDATE CASCADE, "token_id" INTEGER REFERENCES "Token" ("token_id") ON DELETE SET NULL ON UPDATE CASCADE, "client_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("charge_id"));`
    )
    return queryInterface
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users`);
    */
  }
}
