const path = require('path');
const uuid4 = require('uuid4');
const { findOne, update } = require('@tool/db')
const { encrypt } = require('@tool/crypt')

function post(db) {
    return function (req, res, next) {
        return new Promise((resolve, reject) => {
            const { name, email, password } = req.body
            const photo = req.files?.photo
            const obj = {}
            if (name) obj.name = name
            if (password) obj.password = encrypt(password)
            Promise.all([
                findOne(db, 'user', { email }),
                update(db, 'user', { email }, { $set: obj })
            ])
                .then(([usr]) => {
                    if (photo) return updt_img(db, photo, usr)
                    return null
                })
                .then(_ => res.json({}))
                .catch(error => res.status(400).json({ error }))

        })
    }
}

module.exports = post

function updt_img(db, photo, usr) {
    return new Promise((resolve, reject) => {
        const name = uuid4() + '.' + photo?.name.split('.')[1]
        const ph = path.join(__dirname, '../../../../public/images/', name)
        Promise.all([
            update(db, 'img', { userId: usr._id }, { $set: { name } }),
            photo?.mv(ph)
        ])
            .then(resolve)
            .catch(reject)
    })
}