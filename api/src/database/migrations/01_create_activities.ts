import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('activities', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('activities');
}
