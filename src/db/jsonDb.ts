import { Config, JsonDB } from 'node-json-db'

const db = new JsonDB(new Config('./db/users.db', true, false, '/'))

export default db
