'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async remove ({ params: { product_id }, response }) {
    await Product.query()
      .where('id', product_id)
      .delete()
      return response.ok()
  }
}

module.exports = ProductController
