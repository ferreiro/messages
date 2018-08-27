import HistoryQuery from '../types/HistoryQuery'

const MAX_HISTORY_CACHED = 15
const PREV_SEARCHES_CACHE = 'prevSearches'

class SearchHistoryRepository {
	static create = (data) => {
		const newItem = new HistoryQuery({
			query: data.query,
			date: data.date
		})

		SearchHistoryRepository.addQuery(newItem)

		return newItem
	}

    static getMaxSearches () {
        return MAX_HISTORY_CACHED
    }

	static addQuery = (historyQuery) => {
        if (historyQuery.length === 0) {
            return;
        }

        if (!localStorage.hasOwnProperty(PREV_SEARCHES_CACHE)) {
            localStorage[PREV_SEARCHES_CACHE] = "[]"
        }

        const history = JSON.parse(localStorage[PREV_SEARCHES_CACHE])
        localStorage[PREV_SEARCHES_CACHE] =
            JSON.stringify([ historyQuery.toString(), ...history ].slice(0, MAX_HISTORY_CACHED))
    }

	static getQueries = () => {
        let cachedQueries = []
        if (localStorage.hasOwnProperty(PREV_SEARCHES_CACHE)) {
            const cachedItems = JSON.parse(localStorage.getItem(PREV_SEARCHES_CACHE))
            cachedItems.forEach(item => cachedQueries.push(new HistoryQuery(JSON.parse(item))))
        }
        return cachedQueries.slice(0, MAX_HISTORY_CACHED)
	}
}

export default SearchHistoryRepository