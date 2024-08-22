const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const account = require('../controllers/account.controller')

// create
router.post('/', account.create, sendResponse)

// find params id
router.get('/:id', account.read, sendResponse) 

// find by query or body
router.get('/', account.read, sendResponse) 

// update
router.put('/', account.update, sendResponse) 

// delete by params id
router.delete('/:id', account.destroy, sendResponse) 

module.exports = router