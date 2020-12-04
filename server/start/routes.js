'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  Route.get('product', 'ProductController.index')
}).prefix('api')

Route.group(() => {
  Route.get('check', 'AdminController.check')
  Route.post('login', 'AdminController.login').validator('AdminLogin')
  Route.get('logout', 'AdminController.logout')
}).prefix('api/admin').namespace('Admin')
