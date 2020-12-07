'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchasedItemSchema extends Schema {
  up () {
    this.create('purchased_item', (table) => {
      table.integer('purchase_id').unsigned().notNullable()
        .references('id').inTable('purchase')
        .onDelete('cascade').onUpdate('cascade')
      table.integer('product_id').unsigned().notNullable()
        .references('id').inTable('product')
        .onDelete('restrict').onUpdate('cascade')
      table.integer('amount').unsigned().notNullable().default(1)
      table.decimal('price', 10, 2).notNullable()
      table.unique(['purchase_id', 'product_id'])
    })
  }

  down () {
    this.drop('purchased_item')
  }
}

module.exports = PurchasedItemSchema
