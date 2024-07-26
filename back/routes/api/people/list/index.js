const moment = require('moment/moment');
const { findOne } = require('@tool/db');
const { ObjectId } = require('mongojs');

function data(db) {
    return function (req, res, next) {
        return new Promise((resolve, reject) => {
            const _id = req.params.id ? ObjectId(req.params.id) : null
            list(db, _id)
                .then(d => res.json(d))
                .catch(error => res.status(400).json({ error }))
        })
    }
}

module.exports = data

function list(db, id) {
    return new Promise((resolve, reject) => {
        let count = 0
        let end = false
        const q = { _id: { $ne: id } }
        const cur = db.user.find(q)
        const arr = []
        cur.on('error', reject)
        cur.on('end', _ => {
            end = true
            if (count) return
            resolve(arr)
        })
        cur.on('data', doc => {
            ++count
            findOne(db, 'img', { userId: doc._id })
                .then(img => {
                    arr.push({
                        name: doc.name,
                        age: moment().diff(doc.born, 'years', false),
                        img: 'http://127.0.0.1:4050/images/' + img.name
                    })
                    if (--count) return
                    if (!end) return
                    resolve(arr)
                })
                .catch(reject)
        })
    })
}