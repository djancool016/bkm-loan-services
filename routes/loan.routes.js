const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const loan = require('../controllers/loan.controller')

// create
router.post('/', loan.create, sendResponse)

// find params id
router.get('/:id', loan.read, sendResponse) 

// find by query or body
router.get('/', loan.read, sendResponse) 

// update
router.put('/', loan.update, sendResponse) 

// delete by params id
router.delete('/:id', loan.destroy, sendResponse) 

module.exports = router