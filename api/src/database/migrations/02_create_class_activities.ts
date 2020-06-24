import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('class_activities', table => {
    table.increments('id').primary();

    table.integer('class_id').notNullable().references('id').inTable('classes');

    table
      .integer('activity_id')
      .notNullable()
      .references('id')
      .inTable('activities');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('class_activities');
}
