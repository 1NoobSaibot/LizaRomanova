'use strict'

class UserLogin {
  get validateAll() {
    return true
  }

  get messages () {
    return {
      'email.required': 'Введите почту',
      'email.min': 'Почта должна быть не меньше 3 символов',
      'email.max': 'Почта должна быть не больше 160 символов',
      'email.email': 'Электронная почта введена некорректно'
    }
  }

  get rules () {
    return {
      email: 'required|string|min:3|max:254|email'
    }
  }

  get sanitizationRules() {
    return {
      email: 'strip_tags|escape|trim'
    }
  }
}

module.exports = UserLogin
