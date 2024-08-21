const UnitTestFramework = require("../unit.test.framework")
const {db, pool, truncateAll} = require('../../database').init()
const {seedTables} = require('../../seeders')
const CoaModel = require('../../models/coa.model')
const {migration} = require('../../migrations')

const testCases = {
    create: [
        {
            input: {id: 78987, accountId: 1, baseValue: 1000, code: 9090, description: 'New Account'},
            output: {data:{affectedRows: 1}},
            description: 'Success should returning affectedRows = 1'
        }, {
            input: {accountIdX: 1, baseValue: 1000, code: 1010, description: 'New Account'},
            output: {code: 'ER_BAD_FIELD_ERROR'},
            description: 'Invalid input should throwing error code ER_BAD_FIELD_ERROR'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findByPk: [
        {
            input: 1,
            output: {data: [{id: 1, accountId: 1, baseValue: 291350, code: 1010, description: 'Kas UPK'}]},
            description: 'Success should returning array of objects'
        }, {
            input: 99999,
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findAll: [
        {
            input: {},
            output: {data: [{id: 1, accountId: 1, baseValue: 291350, code: 1010, description: 'Kas UPK'}]},
            description: 'Success should returning array of objects'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findByKeys: [
        {
            input: {id:1, accountId: 1, baseValue: 291350, code: 1010, description: 'Kas UPK'},
            output: {data: [{id: 1, accountId: 1, baseValue: 291350, code: 1010, description: 'Kas UPK'}]},
            description: 'Success should returning array of objects'
        }, {
            input: {id:999, accountId: 1, baseValue: 291350, code: 1010, description: 'Kas UPK'},
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    update: [
        {
            input: {id: 78987, accountId: 1, baseValue: 1000, code: 9020, description: 'New Description'},
            output: {data: {affectedRows: 1}},
            description: 'Success should affectedRows  = 1'
        }, {
            input: {id: 78987, accountIdX: 1, baseValue: 1000, code: 1010, description: 'New Description'},
            output: {code: 'ER_BAD_FIELD_ERROR'},
            description: 'Invalid input should throwing error code ER_BAD_FIELD_ERROR'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    delete: [
        {
            input: 78987,
            output: {data: {affectedRows: 1}},
            description: 'Success should affectedRows = 1'
        }, {
            input: 78912,
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ]
}

const testModule = new CoaModel()

const test = new UnitTestFramework(testCases, testModule)

const affectedTables = ['entry', 'coa']

test.setBeforeAll = async () => {
    return await db.connect().then(async db => {
        await truncateAll(db, affectedTables)
        await migration(db)
        await seedTables(db, affectedTables.reverse())
    })
}
test.setAfterAll = async () => {
    await pool.end()
    await db.end()
}

test.runTest()