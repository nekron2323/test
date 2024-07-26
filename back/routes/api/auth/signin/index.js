const { findOne } = require('@tool/db')
const { decrypt } = require('@tool/crypt')
function signin(db) {
    return function (req, res, next) {
        const { email, password } = req.body
        const result = { error: '' }
        findOne(db, 'user', { email })
            .then(usr => {
                if (!usr) return Promise.reject('Пользователя с таким e-mail не найдено!')
                if (decrypt(usr.password) !== password) return Promise.reject('Пароль указан неверно!')
                res.json({
                    user: {
                        _id: usr._id,
                        name: usr.name
                    }
                })
            })
            .catch(error => res.status(400).json(error))
    }
}

module.exports = signin