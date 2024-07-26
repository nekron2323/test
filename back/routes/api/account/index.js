const get = require("./get")
const post = require("./post")

function account(router, db) {
    router.get('/account/:id', get(db))
    router.post('/account', post(db))
}

module.exports = account