'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Client" ("client_id"  SERIAL , "aboweb_client_id" INTEGER, "email" VARCHAR(255) NOT NULL UNIQUE, "type_client" INTEGER, "first_name" VARCHAR(255), "last_name" VARCHAR(255), "login_code" INTEGER, "login_code_created_at" TIMESTAMP WITH TIME ZONE, "is_godson" BOOLEAN, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, UNIQUE ("email"), PRIMARY KEY ("client_id"));`
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
