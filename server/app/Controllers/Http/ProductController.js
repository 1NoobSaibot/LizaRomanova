'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index ({ response }) {
    const products = await Product.all()
    return response.json(products)
  }

  async show ({ params: { product_id }, response }) {
    const product = await Product.find(product_id)
    if (product) return response.json(product)
    return response.notFound()
  }
}

module.exports = ProductController
