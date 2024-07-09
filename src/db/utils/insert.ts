import { type LowSync } from 'lowdb'

import { db, type DBSchemas } from '../db.js'
import { type Account, type Contract, type Network, type User, type Wallet } from '../index.js'

import { hash } from './crypto.js'
import fetchDb from './fetch.js'

const insertDb = (target: DBSchemas, data: any): Account | Contract | Network | User | Wallet => {
    const schema: LowSync<any> = db[target]
    // fetch database element
    const pk = target.replace(/s$/, '')
    const res = fetchDb(target, pk, data[pk])
    // ensure element does not exist
    if (res.length !== 0) throw new Error('database element does exists')
    // generate element hash id
    data.id = hash(JSON.stringify(data))
    // add element to db
    schema.data[target].push(data)
    schema.write()

    return data
}

export default insertDb
