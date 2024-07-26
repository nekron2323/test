const express = require('express');
const router = express.Router();

const auth = require('./auth');
const account = require('./account');
const people = require('./people');

function api(db) {
    auth(router, db)
    account(router, db)
    people(router, db)
    return router
}

module.exports = api