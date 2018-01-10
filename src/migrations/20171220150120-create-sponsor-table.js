'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Sponsor" ("sponsor_id"  SERIAL , "code" VARCHAR(255), "has_been_used" BOOLEAN NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "godfather_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "godson_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "subscription_id" INTEGER REFERENCES "Subscription" ("subscription_id") ON DELETE SET NULL ON UPDATE CASCADE, "token_id" INTEGER REFERENCES "Token" ("token_id") ON DELETE SET NULL ON UPDATE CASCADE, "checkout_id" INTEGER REFERENCES "Checkout" ("checkout_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("sponsor_id"));`
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
