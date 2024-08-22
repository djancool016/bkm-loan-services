const router = require('express').Router()

router.use('/ksm', require('./ksm.routes')),
router.use('/account', require('./account.routes'))
router.use('/coa', require('./coa.routes'))
router.use('/register', require('./register.routes'))
router.use('/entry', require('./entry.routes'))
router.use('/loan', require('./loan.routes'))
router.use('/saving', require('./saving.routes'))
router.use('/transaction', require('./transaction.routes'))

module.exports = (app) => {
    app.use('/api', router)
}