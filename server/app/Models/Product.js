'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static get table () {
    return 'product'
  }

  category () {
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }

  purchasedItems () {
    return this.hasMany('App/Models/PurchasedItem', 'id', 'product_id')
  }
}

module.exports = Product
