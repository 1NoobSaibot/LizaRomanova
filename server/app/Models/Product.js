'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  static get table () {
    return 'product'
  }

  category () {
    this.hasOne('App/Models/Category', 'category_id', 'id')
  }
}

module.exports = Product