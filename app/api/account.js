import api from './api'

export default {
		login (data) {
				return api.post(`/v1/api/user/token/`, data)
		}
}
