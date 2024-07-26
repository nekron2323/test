const path = require('path');
const uuid4 = require('uuid4');
const { insert, findOne } = require('@tool/db');
const { encrypt } = require('@tool/crypt')

function signup(db) {
    return function (req, res, next) {
        return new Promise((resolve, reject) => {
            const user = req.body
            const photo = req.files?.photo
            const name = uuid4() + '.' + photo?.name.split('.')[1]
            const ph = path.join(__dirname, '../../../../public/images/', name)
            let usr
            findOne(db, 'user', {email: user.email})
                .then(r => {
                    if (r) return Promise.reject('Пользователь с таким e-mail уже существует!')
                    return Promise.all([
                        insert(db, 'user', {
                            name: user.name,
                            email: user.email,
                            password: encrypt(user.password),
                            born: new Date(user.born),
                            sex: user.sex
                        }),
                        photo?.mv(ph)
                    ])
                })
                .then(([doc]) => {
                    if (!photo) return
                    usr = doc
                    return insert(db, 'img', {
                        name,
                        userId: doc._id
                    })
                })
                .then(_ => res.json({}))
                .catch(error => res.status(400).json(error))
        })
    }
}

module.exports = signup