import { type LowSync } from 'lowdb'

import { db, type DBSchemas } from '../db.js'

import fetchDb from './fetch.js'

const insertDb = (target: DBSchemas, data: any): void => {
    const schema: LowSync<any> = db[target]
    // fetch database element
    const pk = target.replace(/s$/, '')
    const element = fetchDb(target, pk, data[pk])
    // ensure element does not exist
    if (!(element == null)) throw new Error('database element does exists')
    // add element to db
    schema.data[target].push(data)
    schema.write()
}

export default insertDb
