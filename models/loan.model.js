const QueryBuilder = require("../utils/queryBuilder")
const {BaseModel, mapReferences} = require("./bese.model")
const migration = require("../migrations/202407201510-create-loan")

const init = {
    table: migration.tableName,
    includes: migration.columns.map(column => column.columnName),
    association: [
        //mapReferences(migration.tableName, migration.columns, 'ksmId')
    ]
}

const queryBuilder = new QueryBuilder(init)

class LoanModel extends BaseModel{
    constructor(){
        super(queryBuilder)
    }
}

module.exports = LoanModel