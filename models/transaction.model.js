const QueryBuilder = require("../utils/queryBuilder")
const {BaseModel, mapReferences} = require("./bese.model")
const migration = require("../migrations/202407221351-create-transaction")

const init = {
    table: migration.tableName,
    includes: migration.columns.map(column => column.columnName),
    association: [
        mapReferences(migration.tableName, migration.columns, 'registerId', ['description'], {
            description: 'registerName'
        })
    ]
}

const queryBuilder = new QueryBuilder(init)

class TransactionModel extends BaseModel{
    constructor(){
        super(queryBuilder)
    }
}

module.exports = TransactionModel