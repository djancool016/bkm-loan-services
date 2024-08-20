const Migration = require('./base.migrations')

/**
 * The object migrations contains keys for table names and values containing migration objects.
 */
const migrations = {
    ksm: require('./202407201445-create-ksm'),
    account: require('./202407201449-create-account'),
    coa: require('./202407201450-create-coa'),
    register: require('./202407201451-create-register'),
    entry: require('./202407201455-create-entry'),
    loan: require('./202407201510-create-loan'),
    saving: require('./202407221350-create-saving'),
    transaction: require('./202407221351-create-transaction')
}

module.exports = {
    /**
     * 
     * @param {Object} db Database connection 
     * @returns 
     */
    migration: (db) => Migration.migrate({migrations, db})
}