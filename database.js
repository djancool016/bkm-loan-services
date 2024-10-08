const mysql = require('mysql2/promise')
const {db_config, logging} = require('./config')

/**
 * Class for handling MYSQL database connection
 */
class MysqlDatabaseConnection {
    constructor(){
        this.db = null
    }
    static getInstance() {
        if (!MysqlDatabaseConnection.instance) {
            MysqlDatabaseConnection.instance = new MysqlDatabaseConnection()
        }
        return MysqlDatabaseConnection.instance
    }
    /**
     * @returns mysql database connection
     */
    async connect() {
        if(!this.db){
            try {
                this.db = await mysql.createConnection(db_config)
                if(logging) console.log("Successfully connected to database")
                return this.db
            } catch (error) {
                throw error
            }
        }
        return this.db
    }
    /**
     * Close database connection
     */
    async end(){
        if(this.db){
            try {
                await this.db.end()
                if(logging) console.log('Database connection closed.')

            } catch (error) {
                if(logging) console.error('Error closing database connection', error)
                throw error
            } finally {
                this.db = null // Set database to null after closing
            }
        } else {
            if(logging) console.warn('Database connection is already closed or was never initialized')
        }
    }
}

/**
 * Class for handling MYSQL pool connection
 */
class MysqlPoolConnection {
    constructor() {
        this.pool = null
    }

    static getInstance() {
        if (!MysqlPoolConnection.instance) {
            MysqlPoolConnection.instance = new MysqlPoolConnection()
        }
        return MysqlPoolConnection.instance
    }

    /**
     * 
     * @param {Boolean} waitForConnections - Determines the pool's action when no connections are available and the limit has been reached.
     * @param {Number} connectionLimit - The maximum number of connections to create at once. (Default: 10)
     * @param {Number} queueLimit - The maximum number of connection requests the pool will queue before returning an error. (Default: 0)
     * @returns - Mysql pool connection
     */
    createPool(
        waitForConnections = true,
        connectionLimit = 10,
        queueLimit = 0
    ){
        if(!this.pool){
            try {
                this.pool = mysql.createPool({
                    ...db_config,
                    waitForConnections,
                    connectionLimit,
                    queueLimit
                })
                return this.pool
            } catch (error) {
                if(logging) console.error("Error creating a connection pool", error)
                throw error
            }
        }
    }
    /**
     * Close pool connection
     */
    async end(){
        if (this.pool){
            try {
                await this.pool.end()
                if(logging) console.log('Pool connection closed')
            } catch (error) {
                if(logging) console.error('Error closing pool connection', error)
                throw error
            } finally {
                this.pool = null // Set pool to null after closing
            }
        } else {
            if(logging) console.warn('Pool connection is already closed or was never initialized')
        }
    }
}

/**
 * @returns Turncate or delete all data on database
 */
async function truncateAll(database, truncateTable = []){
    try {
        let tbl
        const [tables] = await database.query('SHOW TABLES')

        if(truncateTable.length > 0){
            // Create a lookup for migration order
            const orderLookup = truncateTable.reduce((acc, tableName, index) => {
                acc[tableName] = index
                return acc
            }, {})

            // Create a lookup for the tables to be truncated
            const truncateTableSet = new Set(truncateTable)

            // Filter tables based on truncateTable
            const tablesToTruncate = tables.filter(table => {
                const tableName = table[Object.keys(table)[0]];
                return truncateTableSet.has(tableName);
            })

            // Sort tables based on migration order
            const sortedTables = tablesToTruncate.sort((a, b) => {
                const tableNameA = a.Tables_in_bkm_loan_service_test
                const tableNameB = b.Tables_in_bkm_loan_service_test
                return orderLookup[tableNameA] - orderLookup[tableNameB]
            })
            
            tbl = sortedTables
        }else{
            tbl = tables
        }

        if(tbl.length > 0){
            // Disable foreign key checks
            await database.query('SET FOREIGN_KEY_CHECKS = 0')

            await Promise.all(tbl.map(async(table) => {
                const tableName = table[Object.keys(table)[0]]
                // Truncate table
                if(logging) console.log(`Truncating table ${tableName}`)
                await database.query(`TRUNCATE TABLE ${tableName}`)
            }))

            // Enable foreign key checks
            await database.query('SET FOREIGN_KEY_CHECKS = 1')

            if(logging) console.log('All tables have been truncated.')
            return
        }

        if(logging)  console.log('0 tables found')
        return

    } catch (error) {
        if(logging) console.log('Failed to truncate tables!')
        if(logging) console.error(error)
        throw error
    }
}

module.exports = {
    init: function () {
        const db = MysqlDatabaseConnection.getInstance()
        const pool = MysqlPoolConnection.getInstance()
        return {
            db,
            pool,
            truncateAll
        }
    }
}