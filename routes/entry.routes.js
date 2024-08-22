const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const entry = require('../controllers/entry.controller')

// create
router.post('/', entry.create, sendResponse)

// find params id
router.get('/:id', entry.read, sendResponse) 

// find by query or body
router.get('/', entry.read, sendResponse) 

// update
router.put('/', entry.update, sendResponse) 

// delete by params id
router.delete('/:id', entry.destroy, sendResponse) 

module.exports = router