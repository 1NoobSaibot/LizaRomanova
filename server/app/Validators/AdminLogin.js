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
      'email.email': 'Электронная почта введена некорректно',
      'password.required': 'Введите пароль',
      'password.min': 'Пароль должен быть не меньше 4 символов',
      'password.max': 'Пароль должен быть не больше 160 символов'
    }
  }

  get rules () {
    return {
      email: 'required|string|min:3|max:160',
      password: 'required|string|min:4|max:160',
    }
  }

  get sanitizationRules() {
    return {
      email: 'strip_tags|escape|trim',
      password: 'strip_tags|escape|trim'
    }
  }
}

module.exports = UserLogin
