'use strict'
const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  use('App/Validators/Extend/index.js')()
})
