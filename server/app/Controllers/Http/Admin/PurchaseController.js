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

  async newPurchasesCount ({ response }) {
    const count = await Purchase.query()
      .where('status', 'new')
      .count()
    return response.send(count[0]['count(*)'])
  }

  async setStatus ({ params: { id, status }, response }) {
    const purchase = await Purchase.find(id)
    if (!purchase) return response.notFound()

    if (purchase.status !== status) {
      purchase.status = status
      await purchase.save()
    }
    return response.ok()
  }
}

module.exports = CategoryController
