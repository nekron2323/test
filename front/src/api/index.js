class Api {
	constructor(url, headers) {
		this._url = url
		this._headers = headers
	}

	checkResponse(res) {
		return new Promise((resolve, reject) => {
			if (res.status === 204) return resolve(res)
			const func = res.status < 400 ? resolve : reject
			res.json().then(data => func(data))
		})
	}

	signIn({ email, password }) {
		return fetch(
			`${this._url}api/auth/signin`,
			{
				method: 'POST',
				headers: this._headers,
				body: JSON.stringify({ email, password })
			}).then(this.checkResponse)
	}

	signUp(data) {
		return fetch(
			`${this._url}api/auth/signup`,
			{
				method: 'POST',
				body: data
			}
		).then(this.checkResponse)
	}

	getAccount({ id }) {
		return fetch(
			`${this._url}api/account/${id}`,
			{
				method: 'GET',
				headers: this._headers,
			}
		).then(this.checkResponse)
	}

	editAccount(data) {
		return fetch(
			`${this._url}api/account`,
			{
				method: 'POST',
				body: data
			}
		).then(this.checkResponse)
	}

	getPeople({id}) {
		return fetch(
			`${this._url}api/people/${id}`,
			{
				method: 'GET',
				headers: this._headers,
			}
		).then(this.checkResponse)
	}
}


export default new Api('http://127.0.0.1:4050/', { 'Content-Type': 'application/json' })