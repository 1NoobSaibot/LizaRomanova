'use strict'

const DB = use('Database')
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')
const Purchase = use('App/Models/Purchase')
const PurchasedItem = use('App/Models/PurchasedItem')

class ProductController {
  async index ({ response }) {
    const products = await Product.all()
    return response.json(products)
  }

  async indexCategory ({ params: { category_id }, response }) {
    const products = await Product.query()
      .where('category_id', category_id)
      .fetch()

    return response.json(products)
  }

  async show ({ params: { product_id }, response }) {
    const product = await Product.find(product_id)
    if (product) return response.json(product)
    return response.notFound()
  }

  async buy ({ request, response }) {
    const email = request.post().email
    const cart = request.post().cart

    if (!(cart instanceof Array)) return response.unprocessableEntity('Корзина не массив')
    for (let i = 0; i < cart.length; i++) {
      const { id, amount } = cart[i]
      if (!(typeof amount == 'number' || typeof amount == 'string')) {
        return response.unprocessableEntity(`Количество товара id=${id} имеет неверный тип - ${typeof amount}`)
      }
      if (!isFinite(amount) || !Number.isInteger(+amount) || +amount < 1) {
        return response.unprocessableEntity(`Количество товара id=${id} имеет неверное значение - ${amount}`)
      }

      const product = await Product.find(id)
      if (!product) return response.unprocessableEntity(`Товар id=${id} не найден`)
      cart[i].price = product.price
    }

    await DB.transaction(async trx => {
      const now = new Date
      const purchase = await Purchase.create({
        client_email: email,
        created_at: now,
        updated_at: now
      }, trx)

      const m = new Array(cart.length)
      for (let i = 0; i < cart.length; i++) {
        m[i] = {
          purchase_id: purchase.id,
          product_id: cart[i].id,
          amount: cart[i].amount,
          price: cart[i].price
        }
      }
      await PurchasedItem.createMany(m, trx)
    })

    return response.ok()
  }

  async categories ({ response }) {
    const array = await Category.all()
    return response.json(array)
  }
}

module.exports = ProductController
