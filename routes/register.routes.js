const router = require('express').Router()
const {sendResponse} = require('../controllers/base.controller')
const register = require('../controllers/register.controller')

// create
router.post('/', register.create, sendResponse)

// find params id
router.get('/:id', register.read, sendResponse) 

// find by query or body
router.get('/', register.read, sendResponse) 

// update
router.put('/', register.update, sendResponse) 

// delete by params id
router.delete('/:id', register.destroy, sendResponse) 

module.exports = router