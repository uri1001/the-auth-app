import { type LowSync } from 'lowdb'

import { db, type DBSchemas } from '../db.js'

import { type Account, type Contract, type Network, type User, type Wallet } from '../index.js'
import fetchDb from './fetch.js'

const deleteDb = (
    target: DBSchemas,
    param: string,
    key: string,
): Account[] | Contract[] | Network[] | User[] | Wallet[] | [] => {
    const schema: LowSync<any> = db[target]
    // delete all db elements if no parameter or key provided
    if (param === '' || key === '') {
        const data = schema.data[target]
        schema.update(data => {
            data[target] = []
        })
        return data
    }
    // fetch database element
    const res = fetchDb(target, param, key)
    // ensure database elements exists
    if (res.length === 0) throw new Error('database elements do not exist')
    // remove existing element from db
    schema.update(data => {
        data[target] = data[target].filter((e: any) => e[param] !== key)
    })

    return res
}

export default deleteDb
