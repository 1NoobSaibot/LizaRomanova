'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PurchasedItem extends Model {
  static get table () {
    return 'purchased_item'
  }

  static get createdAtColumn () {
    return false
  }

  static get updatedAtColumn () {
    return false
  }

  purchase () {
    return this.hasOne('App/Models/Purchase', 'purchase_id', 'id')
  }

  product () {
    return this.hasOne('App/Models/Product', 'product_id', 'id')
  }
}

module.exports = PurchasedItem
