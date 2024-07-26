const list = require("./list")

function people(router, db) {
    router.get('/people/:id', list(db))
    router.get('/people', list(db))
}

module.exports = people