import { Config, JsonDB } from 'node-json-db'

const db = new JsonDB(new Config('./db/users.json', true, false, '/'))

export default db
