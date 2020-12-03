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
const Category = use('App/Models/Category')

class AdminSeeder {
  async run () {
    const category = await Category.findOrCreate(
      { name: 'Процессоры' },
      { name: 'Процессоры' }
    )

    await category.products().createMany([
      {
        name: 'Intel Core i1',
        description: 'Первый 0.5-ядерный процессор',
        props_json: JSON.stringify({
          'Производитель': 'Intel',
          'Частота': '2.3 Гц',
          'Количество транзисторов': '3'
        }),
        price: 1000
      }, {
        name: 'AMD Furnace',
        description: 'Обогреватель',
        props_json: JSON.stringify({
          'Производитель': 'AMD',
          'Частота': 'Нет. Это аналоговый нагревательный элемент'
        }),
        price: 2000
      }
    ])

  }
}

module.exports = AdminSeeder
