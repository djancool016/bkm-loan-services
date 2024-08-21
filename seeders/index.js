const Seeder = require('./base.seeder')

const seeds = {
    ksmSeed: require('./202407261017-ksm-seed'),
    accountSeed: require('./202407291250-account-seed'),
    coaSeed: require('./202407291252-coa-seed'),
    registerSeed: require('./202407291253-register-seed'),
    entrySeed: require('./202407291254-entry-seed'),
    loanSeed: require('./202407291310-loan-seed'),
    savingSeed: require('./202407291315-saving-seed'),
    transactionSeed: require('./202707291336-transaction-seed')
}

async function seedTables(db, tableList = []) {
    let seedsToRun
    
    if(tableList.length > 0){
        // Create a lookup for seeds by table name
        const seedLookup = Object.entries(seeds).reduce((acc, [key, seed]) => {
            const tableName = key.replace('Seed', '').toLowerCase() // Assuming seed names match table names
            acc[tableName] = seed
            return acc
        }, {})

        // Filter and sort seeds based on tableList
        seedsToRun = tableList
            .map(tableName => seedLookup[tableName])
            .filter(Boolean) // Remove undefined values if any table names don't have corresponding seeds
    }else{
        seedsToRun = seeds
    }

    const arraySeeds = Object.values(seedsToRun)
    await Seeder.seedTables(arraySeeds, db)
}

module.exports = {
    seedTables: (db, tableList) => seedTables(db, tableList)
}