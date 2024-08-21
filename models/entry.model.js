const QueryBuilder = require("../utils/queryBuilder")
const {BaseModel, mapReferences} = require("./bese.model")
const migration = require("../migrations/202407201455-create-entry")

const init = {
    table: migration.tableName,
    includes: migration.columns.map(column => column.columnName),
    association: [
        //mapReferences(migration.tableName, migration.columns, 'registerId'),
        //mapReferences(migration.tableName, migration.columns, 'coaCode')
    ]
}

const queryBuilder = new QueryBuilder(init)

class EntryModel extends BaseModel{
    constructor(){
        super(queryBuilder)
    }
}

module.exports = EntryModel