import { type LowSync } from 'lowdb'

import { db, type DBSchemas } from '../db.js'
import { type Account, type Contract, type Network, type User, type Wallet } from '../index.js'

import { hash } from './crypto.js'
import fetchDb from './fetch.js'

const updateDb = (target: DBSchemas, data: any): Account | Contract | Network | User | Wallet => {
    const schema: LowSync<any> = db[target]
    // fetch database element
    const pk = target.replace(/s$/, '')
    const res = fetchDb(target, pk, data[pk])
    // ensure database element exists
    if (res.length === 0) throw new Error('database element does not exists')
    // update targeted database element
    const idx = schema.data[target].findIndex((e: any) => e[pk] === data[pk])
    // generate element hash id
    data.id = hash(JSON.stringify(data))
    // update database
    schema.data[target][idx] = data
    schema.write()

    return data
}

export default updateDb
