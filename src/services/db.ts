import { deleteDb, fetchDb, insertDb, updateDb } from '../db/index.js'

export const queryDb = (query: any): any => {
    switch (query.action) {
        case 'fetch':
            return fetchDb(query.db, query.parameter, query.key)
        case 'insert':
            insertDb(query.db, JSON.parse(query.element))
            break
        case 'update':
            updateDb(query.db, JSON.parse(query.element))
            break
        case 'delete':
            return deleteDb(query.db, query.parameter, query.key)
        default:
            throw new Error('invalid query action')
    }
}
