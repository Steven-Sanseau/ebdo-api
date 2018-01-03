'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Client" ("client_id"  SERIAL , "aboweb_client_id" INTEGER, "email" VARCHAR(255) NOT NULL UNIQUE, "type_client" INTEGER, "first_name" VARCHAR(255), "last_name" VARCHAR(255), "login_code" INTEGER, "login_code_created_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, UNIQUE ("email"), PRIMARY KEY ("client_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Address" ("address_id"  SERIAL , "last_name" VARCHAR(255) NOT NULL, "first_name" VARCHAR(255) NOT NULL, "address" VARCHAR(255) NOT NULL, "address_post" VARCHAR(255), "address_pre" VARCHAR(255), "city" VARCHAR(255) NOT NULL, "phone" VARCHAR(255), "postal_code" VARCHAR(255) NOT NULL, "country" VARCHAR(255) NOT NULL, "company" VARCHAR(255), "type_address" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "client_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("address_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Token" ("token_id"  SERIAL , "token_type" VARCHAR(255), "aboweb_id" VARCHAR(255), "stripe_token_id" VARCHAR(255), "stripe_customer_id" VARCHAR(255), "stripe_card_id" VARCHAR(255), "stripe_card_country" VARCHAR(255), "stripe_card_brand" VARCHAR(255), "stripe_card_cvc_check" VARCHAR(255), "stripe_card_exp_month" INTEGER, "stripe_card_exp_year" INTEGER, "stripe_card_last4" VARCHAR(255), "slimpay_rum_id" VARCHAR(255), "slimpay_token_id" VARCHAR(255), "slimpay_bic" VARCHAR(255), "slimpay_iban" VARCHAR(255), "slimpay_rum_code" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "client_id" INTEGER REFERENCES "Client" ("client_id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("token_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Token' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Offer" ("offer_id"  SERIAL , "name" VARCHAR(255), "aboweb_id" VARCHAR(255), "price_ttc" FLOAT, "monthly_price_ttc" FLOAT, "description" TEXT, "time_limited" BOOLEAN, "duration" INTEGER, "country_shipping" VARCHAR(255), "shipping_cost" FLOAT, "is_gift" BOOLEAN, "payment_method" INTEGER, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("offer_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Newsletter" ("email" VARCHAR(255) NOT NULL , "name" VARCHAR(255), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("email"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Sponsor" ("sponsor_id"  SERIAL , "client_sponsor_id" INTEGER, "code" VARCHAR(255), "checkout_id" INTEGER, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("sponsor_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Subscription" ("subscription_id"  SERIAL , "client_id" INTEGER, "aboweb_id" INTEGER, "checkout_id" INTEGER, "offer_id" INTEGER, "token_id" INTEGER, "address_delivery_id" INTEGER, "address_invoice_id" INTEGER, "voucher_id" INTEGER, "duration" INTEGER, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("subscription_id"));`
    )
    queryInterface.sequelize.query(
      `CREATE TABLE IF NOT EXISTS "Voucher" ("voucher_id"  SERIAL , "abboweb_id" INTEGER, "voucher" VARCHAR(255) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE, "end_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("voucher_id"));`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Client' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Address' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Offer' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )

    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Newsletter' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Sponsor' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Subscription' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
    )
    queryInterface.sequelize.query(
      `SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Voucher' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;`
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
