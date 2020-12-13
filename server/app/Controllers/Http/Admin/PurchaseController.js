'use strict'

const Purchase = use('App/Models/Purchase')

class CategoryController {
  async index ({ response }) {
    const purchases = await Purchase.query()
      .with('items', (item) => {
        item.with('product')
      })
      .fetch()
    return response.json(purchases)
  }
}

module.exports = CategoryController
