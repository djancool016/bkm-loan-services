const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const transaction = require('../controllers/transaction.controller')

// create
router.post('/', transaction.create, sendResponse)

// find params id
router.get('/:id', transaction.read, sendResponse) 

// find by query or body
router.get('/', transaction.read, sendResponse) 

// update
router.put('/', transaction.update, sendResponse) 

// delete by params id
router.delete('/:id', transaction.destroy, sendResponse) 

module.exports = router