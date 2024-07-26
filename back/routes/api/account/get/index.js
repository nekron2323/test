const path = require('path')
const { findOne } = require('@tool/db')
const { ObjectId } = require('mongojs')

function get(db) {
    return function (req, res, next) {
        return new Promise((resolve, reject) => {
            const _id = ObjectId(req.params.id)
            Promise.all([
                findOne(db, 'user', { _id }),
                findOne(db, 'img', { userId: _id })
            ])
                .then(([u, img]) => {
                    res.json({
                        name: u.name,
                        email: u.email,
                        born: u.born,
                        sex: u.sex,
                        img: 'http://127.0.0.1:4050/images/' + img.name
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
    }
}

module.exports = get