const UnitTestFramework = require("../unit.test.framework")
const {db, pool, truncateAll} = require('../../database').init()
const {seedTables} = require('../../seeders')
const KsmModel = require('../../models/ksm.model')
const {migration} = require('../../migrations')

const testCases = {
    create: [
        {
            input: {id: 78987, name: 'NEW KSM', rw: 1},
            output: {data:{affectedRows: 1}},
            description: 'Success should returning affectedRows = 1'
        }, {
            input: {nameX: 'NEW KSM', rw: 1},
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
            output: {data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
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
            output: {data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'Success should returning array of objects'
        }, {
            input: undefined,
            output: {code: 'ER_INVALID_BODY'},
            description: 'Invalid input should throwing error code ER_INVALID_BODY'
        }
    ],
    findByKeys: [
        {
            input: {id:1, name: 'KUTILANG I', rw: 1},
            output: {data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'Success should returning array of objects'
        }, {
            input: {id:999, name: 'KUTILANG I', rw: 1},
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
            input: {id: 2, name: 'New Name', rw: 2},
            output: {data: {affectedRows: 1}},
            description: 'Success should affectedRows  = 1'
        }, {
            input: {id: 2, nameX: 'New Name', rw: 2},
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

const testModule = new KsmModel()

const test = new UnitTestFramework(testCases, testModule)

const affectedTables = ['loan', 'saving', 'ksm']

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