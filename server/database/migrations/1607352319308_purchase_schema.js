'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PurchaseSchema extends Schema {
  up () {
    this.create('purchase', (table) => {
      table.increments()
      table.string('client_email', 254).notNullable()
      table.enum('status', ['new', 'confirmed', 'canceled']).notNullable().defaultTo('new')
      table.timestamps()
    })
  }

  down () {
    this.drop('purchase')
  }
}

module.exports = PurchaseSchema
