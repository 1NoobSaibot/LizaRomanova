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
const Product = use('App/Models/Product')
const DB = use('Database')
const fs = use('fs')
const Helpers = use('Helpers')

const categories = [
  { name: 'Процессоры' },
  { name: 'Видеокарты' },
  { name: 'Память' }
]

const products = {
  'Процессоры': [
    {
      name: 'AMD Ryzen Threadripper 3960X',
      price: 46230,
      description: 'AMD Ryzen Threadripper 3960X - передовой 24-ядерный процессор с разблокированным множителем, ориентированный на рабочие станции и high-end ПК.',
      props_json: {
        'Семейство процессоров': 'AMD Ryzen Threadripper',
        'Тип разъема': 'Socket sTRX4',
        'Количество ядер': '24',
        'Интегрированная графика': 'Нет',
        'Тактовая частота процессора': '3800 МГц',
        'Объем кэш памяти 3 уровня': 'L3: 128MB'
      },
      image: 'ryzen.jpg'
    },
    {
      name: 'INTEL CORE™ I9 9900K',
      price: 20287,
      description: 'Процессор INTEL Core™ i9 9900K с кодовым названием микроархитектуры '
        + 'Coffee Lake-S Refresh. Предназначен для настольной платформы Intel LGA 1151'
        + '. Принадлежит к семейству высокопроизводительных процессоров Core i9. '
        + 'Процессор INTEL Core™ i9 9900K производится по стандарту 14-нм техпроцесса, имеет 8 ядер, '
        + 'которые работают в 14 потоков со штатной тактовой частотой 3.6 ГГц, 5.0 ГГц в режиме Turbo Boost.'
        + ' Объем кэш-памяти 3 уровня равен 14 МБ. Имеет 2-х канальный контроллер памяти DDR4. '
        + 'Особенности Intel Hyper-Threading – работа над двумя задачами одновременно, поможет выполнить '
        + 'больше за меньшее время  Встроенное графическое ядро нового поколения Intel UHD Graphics'
        + ' Ultra HD 4K – наслаждайтесь удивительным и динамичным видео на ваших Ultra HD и 4K дисплеях '
        + '(разрешение до 4096 х 2304) Intel Quick Sync Video дает отличную возможность видеоконференций,'
        + ' быстрого преобразования, редактирования и авторизации видео, а также онлайн обмена OpenCL – '
        + 'теперь программисты могут легко воспользоваться вычислительными мощностями графического ядра'
        + ' Встроенный DirectX 12 API обеспечит наилучшие впечатление от игр и графики. Можно'
        + ' с полной уверенностью утверждать, что компания Intel известна практически каждому пользователю компьютера во всем мире.',
      props_json: {
        'Семейство процессоров': 'Intel Core i9',
        'Тип разъема': 'Socket 1151',
        'Количество ядер': '8',
        'Интегрированная графика': 'Intel UHD Graphics 630',
        'Тактовая частота процессора': '3600 МГц',
        'Объем кэш памяти 3 уровня': 'L3: 16MB'
      },
      image: 'core_i9.jpg'
    },
    {
      name: 'Intel Xeon 2.8GHz Kit',
      price: 16616,
      description: 'Подходит для HP Proliant DL560 G1',
      props_json: {
        'Семейство процессоров': 'Intel Xeon E',
        'Количество ядер': '1',
        'Интегрированная графика': 'Нет',
        'Тактовая частота процессора': '2800 МГц'
      },
      image: 'xeon.jpg'
    }
  ],
  'Видеокарты': [
    {
      name: 'Asus PCI-Ex GeForce RTX 3080',
      price: 44444,
      description: 'TUF Gaming GeForce RTX™3080 – «прокачанная» видеокарта с эффективным охлаждением',
      props_json: {
        'Графический чип': 'GeForce RTX 3080',
        'Объем памяти': '10 ГБ',
        'Разрядность шины памяти': '320 бит',
        'Тип памяти': 'GDDR6X',
        'Тип системы охлаждения': 'Активная'
      },
      image: 'asus_tuf_rtx3080_o10g_gaming_images_20150325561.jpg'
    },
    {
      name: 'MSI PCI-Ex GeForce RTX 3070',
      price: 25999,
      description: 'VENTUS предлагает дизайн, ориентированный на производительность, в котором есть все '
        + 'необходимое для выполнения любой задачи. Благодаря продуманному расположению двух вентиляторов'
        + ' в жестком промышленном корпусе эта видеокарта вписывается в любую конструкцию.',
      props_json: {
        'Графический чип': 'GeForce RTX 3070',
        'Объем памяти': '8 ГБ',
        'Разрядность шины памяти': '256 бит',
        'Тип памяти': 'GDDR6',
        'Тип системы охлаждения': 'Активная'
      },
      image: 'msi_rtx_3070_ventus_2x_oc_images_20161644636.png'
    },
    {
      name: 'XFX PCI-Ex Radeon RX 580 GTS 8GB GDDR5',
      price: 7469,
      description: 'Получите будущие технологии, оптимизированную производительность и управление игрой в '
        + 'новейшей графике Radeon RX 580. Графика Radeon RX 580 имеет новейшую архитектуру Polaris, которая'
        + ' включает в себя графические ядра 4-го поколения GCN, новый движок отображения, новые мультимедийные'
        + ' ядра, все в революционной технологии Next FinFET 14 для повышения производительности и эффективности.',
      props_json: {
        'Графический чип': 'RX 580',
        'Объем памяти': '8 ГБ',
        'Разрядность шины памяти': '256 бит',
        'Тип памяти': 'GDDR5',
        'Тип системы охлаждения': 'Активная'
      },
      image: 'xfx_radeon_rx_580p8dfd6_images_4443020416.jpg'
    }
  ],
  'Память': [
    {
      name: 'HyperX DDR3-1600 8192MB',
      price: 1259,
      description: 'Простой апгрейд системы и современный внешний вид. '
        + 'Включайся в игру вместе с HyperX FURY. Модули памяти FURY автоматически определяют платформу'
        + ' и самостоятельно разгоняются до максимальной доступной частоты (до 1866 МГц), поэтому даже '
        + 'новички смогут улучшить свои игровые результаты.',
      props_json: {
        'Объем памяти': '8 ГБ',
        'Тип памяти': 'DDR3 SDRAM',
        'Частота памяти': '1600 МГц',
        'Схема таймингов памяти': '10-10-10',
        'Количество планок': '1',
        'Назначение': 'Для настольных ПК'
      },
      image: 'hyperx_hx316c10fr_8_images_83197694.jpg'
    },
    {
      name: 'HyperX DDR4-3733 32768MB',
      price: 6329,
      description: 'Оторвись от конкурентов с памятью HyperX Fury RGB DDR4. По-настоящему высокоскоростные '
        + 'модули с низкой латентностью для производительности нового поколения.',
      props_json: {
        'Объем памяти': '32 ГБ',
        'Тип памяти': 'DDR4 SDRAM',
        'Частота памяти': '3733 МГц',
        'Схема таймингов памяти': 'CL19',
        'Количество планок': '2',
        'Назначение': 'Для настольных ПК'
      },
      image: 'copy_hyperx_hx436c17fb3ak2_32_5e1f3da9c981e_images_16348094351.jpg'
    },
    {
      name: 'HyperX DDR4-3333 16384MB',
      price: 2659,
      description: 'Модуль памяти HyperX Predator DDR4 имеет новый агрессивный дизайн теплоотвода в '
        + 'черном алюминиевом исполнении с улучшенным рассеянием тепла, который повышает надежность. '
        + 'Теплоотвод и печатная плата дополняют внешний вид и дизайн новейших ПК, поэтому вы можете выигрышно'
        + ' использовать стиль HyperX. Predator DDR4 обеспечивает высочайшую скорость работы и низкий уровень '
        + 'латентности, а его XMP-профили Intel оптимизированы для чипсетов Intel серии 100 и системных плат X99.',
      props_json: {
        'Объем памяти': '16 ГБ',
        'Тип памяти': 'DDR4 SDRAM',
        'Частота памяти': '3333 МГц',
        'Схема таймингов памяти': 'CL16-18-18 при 1.35 В',
        'Количество планок': '2',
        'Назначение': 'Для настольных ПК'
      },
      image: 'copy_kingston_hx432c16pb3k2_8_575695e301125_images_1635722169.jpg'
    },
    {
      name: 'HyperX DDR4-3200 16384MB',
      price: 2449,
      description: 'Обновленный низкопрофильный теплоотвод'
        + 'Стильный новый теплоотвод станет отличным обновлением для вашей боевой станции.'
        + 'Экономичное решение для повышения производительности'
        + 'HyperX Fury DDR4 — отличный вариант для сборщика систем или того, кто хочет вдохнуть новую жизнь в свою медлительную систему.',
      props_json: {
        'Объем памяти': '16 ГБ',
        'Тип памяти': 'DDR4 SDRAM',
        'Частота памяти': '3200 МГц',
        'Схема таймингов памяти': 'CL16-18-18',
        'Количество планок': '2',
        'Назначение': 'Для настольных ПК'
      },
      image: 'hyperx_hx432c16fb3k2_16_images_13589930731.jpg'
    }
  ],
}

class AdminSeeder {
  async run () {
    createIfNotExists(Helpers.appRoot('uploads'))
    createIfNotExists(Helpers.appRoot('uploads/images'))

    for (let i = 0; i < categories.length; i++) {
      const category = await Category.findOrCreate(categories[i], categories[i])
      const m = products[category.name]
      createIfNotExists(Helpers.appRoot(`uploads/images/${category.id}`))

      for (let j = 0; j < m.length; j++) {
        await DB.transaction(async trx => {
          const srcImgUrl = Helpers.appRoot(`database/seeds/materials/${m[j].image}`)
          const file = fs.readFileSync(srcImgUrl)
          const extension = m[j].image.split('.')[1]
          delete m[j].image
          m[j].props_json = JSON.stringify(m[j].props_json)
          m[j].category_id = category.id

          let product = await Product.query()
            .where('name', m[j].name)
            .where('category_id', category.id)
            .first()
          if (!product) product = await Product.create(m[j], trx)

          createIfNotExists(Helpers.appRoot(`uploads/images/${category.id}/${product.id}`))
          const destImgUrl = Helpers.appRoot(`uploads/images/${category.id}/${product.id}/1.${extension}`)
          fs.writeFileSync(destImgUrl, file)
        })
      }
    }
  }
}

module.exports = AdminSeeder

function createIfNotExists (path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}
