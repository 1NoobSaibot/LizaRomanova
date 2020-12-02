'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Admin = use('App/Models/Admin')

class AdminSeeder {
  async run () {
    await Admin.findOrCreate(
      { email: 'admin@test.te' },
      { email: 'admin@test.te', password: '1234' }
    )
  }
}

module.exports = AdminSeeder
