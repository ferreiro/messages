class HistoryQuery {
	constructor (data) {
		Object.defineProperties(this, {
			query: {
				value: data.query,
				writable: false,
			},

			date: {
				value: data.date,
				writable: false,
			}
		})
	}

	toString = () => {
		const { query, date } = this
		const history = {
			query,
			date,
		}
		return JSON.stringify(history)
	}
} 

export default HistoryQuery