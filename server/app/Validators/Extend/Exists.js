'use strict'

const DB = use('Database')
const Validator = use('Validator')

module.exports = function () {
  Validator.extend('exists', async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) return
    
    const [table, column] = args
    const row = await DB.table(table).where(column, value).first()
  
    if (!row) throw message
  })
}
