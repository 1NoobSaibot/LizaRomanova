'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async store ({ request, response }) {
    const { name } = request.post()
    const category = await Category.create({ name })
    return response.ok(category)
  }

  async update ({ params: { category_id }, request, response }) {
    const { name } = request.post()
    const category = await Category.query()
      .where('id', category_id)
      .update({
        name,
        updated_at: new Date
      })
    return response.ok(category)
  }

  async destroy ({ params: { category_id }, response }) {
    await Category.query()
      .where('id', category_id)
      .delete()
    return response.ok()
  }
}

module.exports = CategoryController
