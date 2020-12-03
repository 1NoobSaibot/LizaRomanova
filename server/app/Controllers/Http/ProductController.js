'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ response }) {
    const products = await Product.all()
    return response.json(products)
  }
}

module.exports = ProductController
