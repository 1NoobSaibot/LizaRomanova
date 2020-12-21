'use strict'

class UserController {
  async check({ auth, response }) {
    try {
      await auth.check()
      return response.json({
        email: auth.user.email,
        id: auth.user.id
      })
    } catch {
      return response.unauthorized()
    }
  }

  async login({ auth, request, response }) {
    const { email, password } = request.post()
    
    try {
      await auth.attempt(email, password)
      const admin = auth.user
      return response.json({
        email: admin.email,
        id: admin.id
      })
    } catch {
      return response.badRequest({
        email: 'Проверьте правильность введённого логина',
        password: 'или пароля'
      })
    }
  }

  async logout ({ auth, response }) {
    await auth.logout()
    return response.ok()
  }
}

module.exports = UserController
