'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Clients" ("client_id"  SERIAL , "aboweb_client_id" INTEGER, "email" VARCHAR(255) NOT NULL UNIQUE, "type_client" INTEGER, "first_name" VARCHAR(255), "last_name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, UNIQUE ("email"), PRIMARY KEY ("client_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Clients' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Subscriptions" ("subscription_id"  SERIAL , "client_id" INTEGER, "aboweb_id" INTEGER, "checkout_id" INTEGER, "offer_id" INTEGER, "token_id" INTEGER, "address_delivery_id" INTEGER, "address_invoice_id" INTEGER, "voucher_id" INTEGER, "duration" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("subscription_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Subscriptions' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Addresses" ("address_id"  SERIAL , "client_id" INTEGER NOT NULL, "last_name" VARCHAR(255) NOT NULL, "first_name" VARCHAR(255) NOT NULL, "address" VARCHAR(255) NOT NULL, "city" VARCHAR(255) NOT NULL, "phone" VARCHAR(255), "postal_code" VARCHAR(255) NOT NULL, "country" VARCHAR(255) NOT NULL, "company" VARCHAR(255), "type_address" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "ClientClientId" INTEGER REFERENCES "Clients" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "fk_address_clients" INTEGER REFERENCES "Clients" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "fk_address_sub" INTEGER REFERENCES "Subscriptions" ("subscription_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("address_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Addresses' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Tokens" ("token_id"  SERIAL , "client_id" INTEGER NOT NULL, "token_stripe" VARCHAR(255), "rum_slimpay" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "ClientClientId" INTEGER REFERENCES "Clients" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("token_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Tokens' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Offers" ("offer_id"  SERIAL , "name" VARCHAR(255), "aboweb_id" VARCHAR(255), "price_ht" FLOAT, "price_ttc" FLOAT, "monthly_price_ttc" FLOAT, "description" TEXT, "ref" INTEGER, "time_limited" BOOLEAN, "duration" INTEGER, "shipping_cost" INTEGER, "is_gift" BOOLEAN, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("offer_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Offers' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Checkouts" ("checkout_id"  SERIAL , "checkout_step" INTEGER, "client_id" INTEGER, "cookie_id" INTEGER, "address_delivery_id" INTEGER, "address_invoice_id" INTEGER, "token_id" INTEGER, "offer_id" INTEGER, "payment_method" INTEGER, "status" VARCHAR(255), "source" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "ClientClientId" INTEGER REFERENCES "Clients" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, "TokenTokenId" INTEGER REFERENCES "Tokens" ("token_id") ON DELETE SET NULL ON UPDATE CASCADE, "OfferOfferId" INTEGER REFERENCES "Offers" ("offer_id") ON DELETE SET NULL ON UPDATE CASCADE, "fk_client_id" INTEGER REFERENCES "Clients" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("checkout_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Checkouts' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Newsletters" ("email" VARCHAR(255) NOT NULL , "name" VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("email"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Newsletters' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Sponsors" ("sponsor_id"  SERIAL , "client_sponsor_id" INTEGER, "code" VARCHAR(255) NOT NULL, "checkout_id" INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("sponsor_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Sponsors' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Vouchers" ("voucher_id"  SERIAL , "abboweb_id" INTEGER, "voucher" VARCHAR(255) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE, "end_date" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("voucher_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Vouchers' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
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
