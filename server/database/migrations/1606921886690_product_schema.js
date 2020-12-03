'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('product', (table) => {
      table.increments()
      table.integer('category_id').unsigned().notNullable()
        .references('id').inTable('category')
        .onDelete('restrict').onUpdate('cascade')
      table.string('name', 254).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.string('description', 254).default(null)
      table.text('props_json').default(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('product')
  }
}

module.exports = ProductSchema
