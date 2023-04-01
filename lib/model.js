import { isNil } from '@/lib/fp'

export const createModel = (tableName, db, options = {}) => {
  let dbHandler = db
  return {
    db: dbHandler,
    query() {
      return dbHandler(tableName)
    },
    upsertByPK(data) {
      if (!isNil(data[options.primaryKey])) {
        return this.query()
          .update(data)
          .where({
            [options.primaryKey || 'id']: data[options.primaryKey],
          })
          .returning('id')
      }
      return this.query().insert(data).returning('id')
    },
    findOne(filters) {
      return this.query()
        .where({
          ...filters,
        })
        .first()
    },
    findByPK(pkValue, filters) {
      return this.query()
        .where({
          ...filters,
          [options.primaryKey || 'id']: pkValue,
        })
        .first()
    },
    bindDB(handler) {
      dbHandler = handler
      return this
    },
  }
}
