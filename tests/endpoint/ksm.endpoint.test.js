const ApiTestFramework = require('../api.test.framework')
const {db, pool, truncateAll} = require('../../database').init()
const {seedTables} = require('../../seeders')
const {migration} = require('../../migrations')

const testObj = {
    create: [
        {
            method: 'POST',
            endpoint: '/',
            input: {id: 78987, name: 'NEW KSM', rw: 1},
            output: {httpCode: 201, data: {affectedRows: 1}},
            description: 'should insert new data'
        },
        {
            method: 'POST',
            endpoint: '/',
            input: {id: 1, name: 'NEW KSM', rw: 1},
            output: {httpCode: 409},
            description: 'should return error 409 for duplicate data'
        },
        {
            method: 'POST',
            endpoint: '/',
            input: {id: 1, nameX: 'NEW KSM', rw: 1},
            output: {httpCode: 400},
            description: 'should return error 400 for invalid key'
        }
    ],
    findByPk: [
        {
            method: 'GET',
            endpoint: '/1',
            input: {},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'should return role with id 1'
        },{
            method: 'GET',
            endpoint: '/99999',
            input: {},
            output: {httpCode: 404},
            description: 'should return error 404 for non-existent role with id 99999'
        }
    ],
    findAll: [
        {
            method: 'GET',
            endpoint: '/',
            input: {},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'should return all data'
        }
    ],
    findByKeys: [
        {
            method: 'GET',
            endpoint: '/?id=1',
            input: {},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'request using query array should return data with id 1'
        },{
            method: 'GET',
            endpoint: '/?name=KUTILANG',
            input: {},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'request using query array should return data with'
        },{
            method: 'GET',
            endpoint: '/?id=9999',
            input: {},
            output: {httpCode: 404},
            description: 'request using query array should return error 404 for non-existent data with id 9999'
        },
        {
            method: 'GET',
            endpoint: '/?id=1&name=KUTILANG',
            input: {},
            output: {httpCode: 200, data: [{id: 1, name: 'KUTILANG I', rw: 1}]},
            description: 'request using query array should return role with id 2 and name Manager'
        }
    ],
    update: [
        {
            method: 'PUT',
            endpoint: '/',
            input: {id: 78987, name: 'New Name', rw: 2},
            output: {httpCode: 200, data: { affectedRows: 1 }},
            description: 'should update data id 1'
        },
        {
            method: 'PUT',
            endpoint: '/',
            input: {id: 99999, name: 'NonExistent'},
            output: {httpCode: 404},
            description: 'should return error 404 for updating non-existent data with id 99999'
        }
    ],
    delete: [
        {
            method: 'DELETE',
            endpoint: '/78987',
            input: {},
            output: {data: { affectedRows: 1 }},
            description: 'should delete role with id 78987'
        },
        {
            method: 'DELETE',
            endpoint: '/99999',
            input: {},
            output: {httpCode: 404},
            description: 'should return error 404 for deleting non-existent role with id 99999'
        }
    ]
}

const baseURL = 'http://localhost:6200/api/ksm'
const test = new ApiTestFramework(testObj, baseURL)

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
