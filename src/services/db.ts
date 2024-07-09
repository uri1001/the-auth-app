import { deleteDb, fetchDb, insertDb, updateDb } from '../db/index.js'

import { logDbRequest } from '../log.js'

export const queryDb = (query: any): any => {
    const payload = query.action === 'fetch' || query.action === 'delete' ? query.key : query.element

    logDbRequest(query.action, query.parameter, payload)

    switch (query.action) {
        case 'fetch':
            return fetchDb(query.db, query.parameter, query.key)
        case 'insert':
            return insertDb(query.db, JSON.parse(query.element))
        case 'update':
            return updateDb(query.db, JSON.parse(query.element))
        case 'delete':
            return deleteDb(query.db, query.parameter, query.key)
        default:
            throw new Error('invalid query action')
    }
}
