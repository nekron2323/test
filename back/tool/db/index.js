function insert(db, code, data) {
    return new Promise((resolve, reject) => {
        db[code].insert(data, (err, doc) => (err ? reject(err) : resolve(doc)))
    })
}

function findOne(db, code, q, s) {
    return new Promise((resolve, reject) => {
        if (!code) return reject('Не определена коллекция')
        if (!s) return db[code].findOne(q, (err, doc) => {
            err ? reject(err) : resolve(doc)
        })
        db[code].find(q).sort(s)
    })
}

function find(db, code, q, s) {
    return new Promise((resolve, reject) => {
        if (s) return db[code].find(q).sort(s, (err, doc) => err ? reject(err) : resolve(doc))
        db[code].find(q, (err, doc) => err ? reject(err) : resolve(doc))
    })
}

function remove(db, code, query, one = false) {
	return new Promise((resolve, reject) => {
		db[code].remove(query, { justOne: one }, (err, doc) =>
			err ? reject(err) : resolve(doc)
		);
	});
}

function update(db, code, query, obj = {}, opt = {}) {
	return new Promise((resolve, reject) => {
		db[code].update(query, obj, opt, (err, doc) =>
			err ? reject(err) : resolve(doc)
		);
	});
}

module.exports = { insert, find, findOne, remove, update }