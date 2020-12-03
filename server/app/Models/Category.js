'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static get table () {
    return 'category'
  }

  products () {
    return this.hasMany('App/Models/Product', 'id', 'category_id')
  }
}

module.exports = Category
