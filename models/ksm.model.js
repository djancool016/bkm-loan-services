const QueryBuilder = require("../utils/queryBuilder")
const {BaseModel} = require("./bese.model")
const migration = require("../migrations/202407201445-create-ksm")

const init = {
    table: migration.tableName,
    includes: migration.columns.map(column => column.columnName),
    association: []
}

const queryBuilder = new QueryBuilder(init)

class KsmModel extends BaseModel{
    constructor(){
        super(queryBuilder)
    }
}

module.exports = KsmModel