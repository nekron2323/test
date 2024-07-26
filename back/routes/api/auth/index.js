const signin = require('./signin')
const signup = require('./signup')

function auth(router, db) {
    router.post('/auth/signup', signup(db))
    router.post('/auth/signin', signin(db))
}

module.exports = auth