// import { type LowSync } from 'lowdb'

import { type DBSchemas } from '../db.js'

import fetchDb from './fetch.js'

const updateDb = (target: DBSchemas, data: any): void => {
    // const schema: LowSync<any> = db[target]
    // fetch database element
    const pk = target.replace(/s$/, '')
    const element = fetchDb(target, pk, data[pk])
    // ensure database element exists
    if (element == null) throw new Error('database element does not exist')
    // update targeted database element
    // schema.update(d => {
    //     d = d.map((e: any) => (e[pk] === element[pk] ? data : e))
    // })
}

export default updateDb
