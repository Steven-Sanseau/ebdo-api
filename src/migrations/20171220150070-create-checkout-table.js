'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Checkout" ("checkout_id"  SERIAL , "checkout_step" INTEGER, "aboweb_client_id" INTEGER, "aboweb_subscribe_id" INTEGER, "payment_method" INTEGER, "is_gift" BOOLEAN, "status" VARCHAR(255), "cgv_accepted" BOOLEAN, "source" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "client_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "token_id" INTEGER REFERENCES "Token" ("token_id") ON DELETE SET NULL ON UPDATE CASCADE, "invoice_address_id" INTEGER REFERENCES "Address" ("address_id") ON DELETE SET NULL ON UPDATE CASCADE, "delivery_address_id" INTEGER REFERENCES "Address" ("address_id") ON DELETE SET NULL ON UPDATE CASCADE, "offer_id" INTEGER REFERENCES "Offer" ("offer_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("checkout_id"));`
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
