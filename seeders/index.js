const Seeder = require('./base.seeder')

const seeds = {
    ksmSeed: require('./202407261017-ksm-seed'),
    accountSeed: require('./202407291250-account-seed'),
    coaSeed: require('./202407291252-coa-seed'),
    registerSeed: require('./202407291253-register-seed'),
    entrySeed: require('./202407291254-entry-seed'),
    loanSeed: require('./202407291310-loan-seed'),
    transactionSeed: require('./202707291336-transaction-seed')
}

async function seedTables(db) {
    const arraySeeds = Object.values(seeds)
    await Seeder.seedTables(arraySeeds, db)
}

module.exports = {
    seedTables: (db) => seedTables(db)
}