const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const coa = require('../controllers/coa.controller')

// create
router.post('/', coa.create, sendResponse)

// find params id
router.get('/:id', coa.read, sendResponse) 

// find by query or body
router.get('/', coa.read, sendResponse) 

// update
router.put('/', coa.update, sendResponse) 

// delete by params id
router.delete('/:id', coa.destroy, sendResponse) 

module.exports = router