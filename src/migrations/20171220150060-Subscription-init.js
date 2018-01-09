'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Subscription" ("subscription_id"  SERIAL , "aboweb_subscription_id" INTEGER UNIQUE, "aboweb_client_id" INTEGER, "aboweb_offer_id" VARCHAR(255), "first_number_delivered" INTEGER, "last_number_delivered" INTEGER, "is_invoiced" BOOLEAN, "is_suspended" BOOLEAN, "is_resubscription" BOOLEAN, "free_subscription" BOOLEAN, "number_of_copy" INTEGER, "order_number" VARCHAR(255), "begin_at" TIMESTAMP WITH TIME ZONE, "end_at" TIMESTAMP WITH TIME ZONE, "invoiced_number" VARCHAR(255), "status" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, UNIQUE ("aboweb_subscription_id"), PRIMARY KEY ("subscription_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Subscription' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
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
