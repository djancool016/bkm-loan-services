const KsmModel = require('../models/ksm.model')

const baseController = require('./base.controller')

const controller = (method) => (req, res, next) => {
    return baseController[method](req, res, next, model = new KsmModel())
}

module.exports = {
    create: controller('create'),
    read: controller('read'),
    update: controller('update'),
    destroy: controller('destroy')
}