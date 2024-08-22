const EntryController = require('../models/entry.model')

const baseController = require('./base.controller')

const controller = (method) => (req, res, next) => {
    return baseController[method](req, res, next, model = new EntryController())
}

module.exports = {
    create: controller('create'),
    read: controller('read'),
    update: controller('update'),
    destroy: controller('destroy')
}