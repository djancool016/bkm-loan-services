const QueryBuilder = require("../utils/queryBuilder")
const {BaseModel, mapReferences} = require("./bese.model")
const migration = require("../migrations/202407221350-create-saving")

const init = {
    table: migration.tableName,
    includes: migration.columns.map(column => column.columnName),
    association: [
        //mapReferences(migration.tableName, migration.columns, 'ksmId')
    ]
}

const queryBuilder = new QueryBuilder(init)

class SavingModel extends BaseModel{
    constructor(){
        super(queryBuilder)
    }
}

module.exports = SavingModel