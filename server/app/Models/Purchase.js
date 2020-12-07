'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Purchase extends Model {
  static get table () {
    return 'purchase'
  }

  items () {
    return this.hasMany('App/Models/PurchasedItem', 'id', 'purchase_id')
  }
}

module.exports = Purchase
