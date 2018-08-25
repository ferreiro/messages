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
} 

export default HistoryQuery