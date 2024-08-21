const UnitTestFramework = require("../unit.test.framework")
const {db, pool, truncateAll} = require('../../database').init()
const {seedTables} = require('../../seeders')
const TransactionModel = require('../../models/transaction.model')
const {migration} = require('../../migrations')


const testCases = {
    create: [
        {
            input: {id: 34523, registerId: 3, date: "2022-04-20", amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"},
            output: {data:{affectedRows: 1}},
            description: 'Success should returning affectedRows = 1'
        }, {
            input: {registerIdX: 3, date: "2022-04-20", amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"},
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
            output: {data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
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
            output: {data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'Success should returning array of objects'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findByKeys: [
        {
            input: {date: "2022-02-17"},
            output: {data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'Success should returning array of objects'
        }, {
            input: {date: "2022-04-21"},
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
            input: {id: 34523, date: "2022-04-21"},
            output: {data: {affectedRows: 1}},
            description: 'Success should affectedRows  = 1'
        }, {
            input: {idX: 1, dateX: "2022-04-21"},
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
            input: 34523,
            output: {data: {affectedRows: 1}},
            description: 'Success should affectedRows = 1'
        }, {
            input: 99999,
            output: {code: 'ER_NOT_FOUND'},
            description: 'Empty result should throwing error code ER_NOT_FOUND'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ]
}

const testModule = new TransactionModel()

const test = new UnitTestFramework(testCases, testModule)

const affectedTables = ['transaction', 'entry','register']

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