'use strict'

class Product {
  get validateAll() {
    return true
  }

  get messages () {
    return {
      'categoryId.required': 'Укажите категорию',
      'categoryId.integer': 'Категория должна быть целым числом больше нуля',
      'categoryId.above': 'Категория должна быть целым числом больше нуля',
      'categoryId.exists': 'Категория не найдена',
      'name.required': 'Назовите товар',
      'name.string': 'Поле должно быть строкой',
      'name.min': 'Длина имени должна быть от 3-х до 254-х символов',
      'name.max': 'Длина имени должна быть от 3-х до 254-х символов',
      'price.required': 'Укажите цену',
      'price.number': 'Цена должна быть числом',
      'price.above': 'Цена должна быть больше нуля',
      'description.string': 'Описание должно быть строкой',
      'propsJson.json': 'Характеристики должны быть указаны json-строкой'
    }
  }

  get rules () {
    return {
      categoryId: 'required|integer|above:0|exists:category,id',
      name: 'required|string|min:3|max:254',
      price: 'required|number|above:0',
      description: 'string',
      propsJson: 'json'
    }
  }

  get sanitizationRules() {
    return {
      name: 'strip_tags|escape|trim',
      price: 'strip_tags|escape|trim',
      description: 'strip_tags|escape|trim',
      propsJson: 'strip_tags|escape|trim'
    }
  }
}

module.exports = Product
