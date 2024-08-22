const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const ksm = require('../controllers/ksm.controller')

// create
router.post('/', ksm.create, sendResponse)

// find params id
router.get('/:id', ksm.read, sendResponse) 

// find by query or body
router.get('/', ksm.read, sendResponse) 

// update
router.put('/', ksm.update, sendResponse) 

// delete by params id
router.delete('/:id', ksm.destroy, sendResponse) 

module.exports = router