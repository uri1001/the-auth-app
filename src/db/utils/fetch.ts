import { type LowSync } from 'lowdb'

import { db, type DBSchemas } from '../db.js'
import { type Account, type Contract, type Network, type User, type Wallet } from '../index.js'

const fetchDb = (
    target: DBSchemas,
    param: string,
    key: string,
): Account[] | Contract[] | Network[] | User[] | Wallet[] | [] => {
    const schema: LowSync<any> = db[target]
    schema.read()
    // return all db elements if no parameter or key provided
    if (param === '' || key === '') return schema.data[target]
    // return queried db element
    return schema.data[target].filter((e: any) => e[param] === key)
}

export default fetchDb
