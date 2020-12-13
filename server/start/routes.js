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
  Route.get('product/:product_id', 'ProductController.show')
  Route.get('category', 'ProductController.categories')
  Route.get('category/:category_id/product', 'ProductController.indexCategory')
  Route.post('purchase', 'ProductController.buy').validator('Purchase')
}).prefix('api')

Route.group(() => {
  Route.get('check', 'AdminController.check')
  Route.post('login', 'AdminController.login').middleware('guest').validator('AdminLogin')
  Route.get('logout', 'AdminController.logout')

  Route.post('product', 'ProductController.store').middleware('auth').validator('Product')
  Route.put('product/:product_id', 'ProductController.update').middleware('auth').validator('Product')
  Route.delete('product/:product_id', 'ProductController.remove').middleware('auth')

  Route.post('category', 'CategoryController.store').middleware('auth').validator('Category')
  Route.put('category/:category_id', 'CategoryController.update').middleware('auth').validator('Category')
  Route.delete('category/:category_id', 'CategoryController.destroy').middleware('auth')
}).prefix('api/admin').namespace('Admin')

Route.get('file/product/:product_id/avatar', 'ProductController.getFirstImage')
