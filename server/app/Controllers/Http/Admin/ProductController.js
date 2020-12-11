'use strict'

const DB = use('Database')
const Helpers = use('Helpers')
const Product = use('App/Models/Product')

class ProductController {
  async store ({ request, response }) {
    const { categoryId, name, price, description, propsJson } = request.post()
    const avatar = request.file('avatar', {
      types: ['image']
    })

    await DB.transaction(async trx => {
      const product = await Product.create({
        category_id: categoryId,
        name,
        price,
        description,
        props_json: propsJson
      }, trx)

      if (avatar) {
        const path = Helpers.appRoot(`uploads/images/${categoryId}/${product.id}`)
        await avatar.move(path, { name: `1.${avatar.extname}`, overwrite: true })
        if (!avatar.moved()) {
          throw avatar.error()
        }
      }
    })
    
    return response.ok()
  }

  async update ({ params: { product_id }, request, response }) {
    // const product = await Product.find(product_id)
    // if (!product) return response.notFound()
    // const { categoryId, name, price, description, propsJson } = request.post()
    // const avatar = request.file('avatar', { types: ['image'] })

    // await DB.transaction(async trx => {
    //   const product = await Product.create({
    //     category_id: categoryId,
    //     name,
    //     price,
    //     description,
    //     props_json: propsJson
    //   }, trx)

      
    //   const path = Helpers.appRoot(Helpers.appRoot(`uploads/images/${category.id}/${product.id}`))
    //   await avatar.move(path, (file) => {
    //     return {
    //       name: `1.${file.subtype}`,
    //       overwrite: true
    //     }
    //   })
    //   if (!avatar.moved()) {
    //     throw avatar.error()
    //   }
    // })
    
    // return response.ok()
  }

  async remove ({ params: { product_id }, response }) {
    await Product.query()
      .where('id', product_id)
      .delete()
      return response.ok()
  }
}

module.exports = ProductController
