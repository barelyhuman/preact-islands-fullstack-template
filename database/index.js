import knexConfig from '@/knexfile'
import Knex from 'knex'

export const db = createConnection()

let connection

/**
 * @returns {import("knex").Knex}
 */
function createConnection() {
	const config = knexConfig[process.env.NODE_ENV || 'development']
	return connection || ((connection = Knex(config)), connection)
}
