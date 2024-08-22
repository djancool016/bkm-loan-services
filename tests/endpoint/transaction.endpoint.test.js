const ApiTestFramework = require('../api.test.framework')
const {db, pool, truncateAll} = require('../../database').init()
const {seedTables} = require('../../seeders')
const {migration} = require('../../migrations')

const testObj = {
    create: [
        {
            method: 'POST',
            endpoint: '/',
            input: {id: 78987, registerId: 3, date: "2022-04-20", amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"},
            output: {httpCode: 201, data: {affectedRows: 1}},
            description: 'should insert new data'
        },
        {
            method: 'POST',
            endpoint: '/',
            input: {id: 1, registerId: 3, date: "2022-04-20", amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"},
            output: {httpCode: 409},
            description: 'should return error 409 for duplicate data'
        },
        {
            method: 'POST',
            endpoint: '/',
            input: {registerIdX: 3, date: "2022-04-20", amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"},
            output: {httpCode: 400},
            description: 'should return error 400 for invalid key'
        }
    ],
    findByPk: [
        {
            method: 'GET',
            endpoint: '/1',
            input: {},
            output: {httpCode: 200, data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'should return data with id 1'
        },{
            method: 'GET',
            endpoint: '/99999',
            input: {},
            output: {httpCode: 404},
            description: 'should return error 404 for non-existent data'
        }
    ],
    findAll: [
        {
            method: 'GET',
            endpoint: '/',
            input: {},
            output: {httpCode: 200, data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'should return all data'
        }
    ],
    findByKeys: [
        {
            method: 'GET',
            endpoint: '/?id=1',
            input: {},
            output: {httpCode: 200, data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'request using query array should return data'
        },{
            method: 'GET',
            endpoint: '/?registerId=3',
            input: {},
            output: {httpCode: 200, data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'request using query array should return data'
        },{
            method: 'GET',
            endpoint: '/?id=9999',
            input: {},
            output: {httpCode: 404},
            description: 'request using query array should return error 404 for non-existent data'
        },
        {
            method: 'GET',
            endpoint: '/?id=1&registerId=3',
            input: {},
            output: {httpCode: 200, data: [{id: 1, registerId: 3, amount: 98000000, description: "Realisasi Piutang KSM  TUNAS BARU"}]},
            description: 'request using query array should return data'
        }
    ],
    update: [
        {
            method: 'PUT',
            endpoint: '/',
            input: {id: 78987, date: "2022-04-21"},
            output: {httpCode: 200, data: { affectedRows: 1 }},
            description: 'should update data id 1'
        },
        {
            method: 'PUT',
            endpoint: '/',
            input: {id: 99999, date: "2022-04-21"},
            output: {httpCode: 404},
            description: 'should return error 404 for updating non-existent data with id 99999'
        },
        {
            method: 'PUT',
            endpoint: '/',
            input: {id: 78987, dateX: "2022-04-21"},
            output: {httpCode: 400},
            description: 'should return error 404 for invalid key'
        }
    ],
    delete: [
        {
            method: 'DELETE',
            endpoint: '/78987',
            input: {},
            output: {data: { affectedRows: 1 }},
            description: 'should delete data with id 78987'
        },
        {
            method: 'DELETE',
            endpoint: '/99999',
            input: {},
            output: {httpCode: 404},
            description: 'should return error 404 for deleting non-existent data with id 99999'
        }
    ]
}

const baseURL = 'http://localhost:6200/api/transaction'
const test = new ApiTestFramework(testObj, baseURL)

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
