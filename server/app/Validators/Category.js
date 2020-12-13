'use strict'

class Category {
  get validateAll() {
    return true
  }

  get messages () {
    return {
      'name.required': 'Назовите товар',
      'name.string': 'Поле должно быть строкой',
      'name.min': 'Длина имени должна быть от 3-х до 254-х символов',
      'name.max': 'Длина имени должна быть от 3-х до 254-х символов'
    }
  }

  get rules () {
    return {
      name: 'required|string|min:3|max:254'
    }
  }

  get sanitizationRules() {
    return {
      name: 'strip_tags|escape|trim'
    }
  }
}

module.exports = Category
