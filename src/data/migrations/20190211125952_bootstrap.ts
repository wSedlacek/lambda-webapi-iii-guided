import Knex from 'knex';

export const up = (knex: Knex) => {
  return knex.schema
    .createTable('hubs', (tbl) => {
      tbl.increments();
      tbl.string('name').notNullable();
      tbl.timestamps(true, true);

      tbl.unique('name');
    })
    .createTable('messages', (tbl) => {
      tbl.increments();
      tbl
        .string('sender')
        .notNullable()
        .index();
      tbl.text('text').notNullable();
      tbl.timestamps(true, true);

      tbl
        .integer('hub_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('hubs')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

export const down = (knex) => knex.schema.dropTableIfExists('messages').dropTableIfExists('hubs');
