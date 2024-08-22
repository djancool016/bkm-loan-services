const ksmController = require('../../controllers/ksm.controller')
const UnitTestFramework = require('../unit.test.framework')
const {db, pool, truncateAll} = require('../../database').init()
const {seedTables} = require('../../seeders')
const {migration} = require('../../migrations')

const testCases = {
    create: [
        {
            input: {body: {id: 78987, name: 'NEW KSM', rw: 1}},
            output: {httpCode: 201, data:{affectedRows: 1}},
            description: 'Success should returning affectedRows = 1'
        },{
            input: {body: {nameX: 'NEW KSM', rw: 1}},
            output: {httpCode: 400, code: 'ER_BAD_FIELD_ERROR'},
            description: 'Invalid keys should returning httpCode 400'
        },{
            input: {},
            output: {httpCode: 400, code: 'ER_INVALID_BODY'},
            description: 'Invalid body should returning httpCode 400'
        }
    ],
    read: [
        {
            input: {params:{id: 1}},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'input params.id should run model.findByPk and returning array'
        },{
            input: {query:{id: [1, 2]}},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'input query.id should run model.findByKeys and returning array'
        },{
            input: {body: {id: 1}},
            output: {httpCode: 400, code: 'ER_GET_REFUSE_BODY'},
            description: 'using GET from body is not allowed, should return error code ER_GET_REFUSE_BODY'
        },{
            input: {},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'input empty request object should run findAll'
        },{
            input: {query: {id: 99999}},
            output: {httpCode: 404, code: 'ER_NOT_FOUND'},
            description: 'Not found should returning httpCode 404'
        }
    ],
    update: [
        {
            input: {body: {id: 78987, name: 'New Name', rw: 2}},
            output: {httpCode: 200, data:{affectedRows: 1}},
            description: 'Success should returning affectedRows = 1'
        },{
            input: {body: {id: 78987, nameX: 'New Name', rw: 2}},
            output: {httpCode: 400, code: 'ER_BAD_FIELD_ERROR'},
            description: 'Invalid keys should returning httpCode 400'
        },{
            input: {},
            output: {httpCode: 400, code: 'ER_INVALID_BODY'},
            description: 'Invalid body should returning httpCode 400'
        }
    ],
    delete: [
        {
            input: {params: {id: 78987}},
            output: {httpCode: 200, data: {affectedRows: 1}},
            description: 'Success should returning affectedRows = 1'
        },{
            input: {params: {id: 9999}},
            output: {httpCode: 404, code: 'ER_NOT_FOUND'},
            description: 'Not found should returning httpCode 404'
        },{
            input: {params: {id: 1}},
            output: {httpCode: 400, code: 'ER_ROW_IS_REFERENCED_2'},
            description: 'Foreign Key fails should returning httpCode 400'
        },{
            input: {},
            output: {httpCode: 400, code: 'ER_INVALID_BODY'},
            description: 'Invalid body should returning httpCode 400'
        }
    ]
}

const testModule = () => {
    const res = {}
    const next = (req) => () => req.result

    const controller = (method, req) => ksmController[method](req, res, next(req))

    return {
        create: (req) => controller('create', req),
        read: (req) => controller('read', req),
        update: (req) => controller('update', req),
        delete: (req) => controller('destroy', req)
    }
}

const test = new UnitTestFramework(testCases, testModule())

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