const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const saving = require('../controllers/saving.controller')

// create
router.post('/', saving.create, sendResponse)

// find params id
router.get('/:id', saving.read, sendResponse) 

// find by query or body
router.get('/', saving.read, sendResponse) 

// update
router.put('/', saving.update, sendResponse) 

// delete by params id
router.delete('/:id', saving.destroy, sendResponse) 

module.exports = router