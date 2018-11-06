import axios from 'axios';
import Urls from './Urls'

const api = axios.create({
		baseURL: Urls.host
});

api.interceptors.request.use(function (request) {

		return request
})

api.interceptors.response.use(function (response) {
		console.log(response)
		return response.data.data || response.data
}, function (error) {
		console.log(error)
		if (error.response && error.response.data.error_code) {

		}
		return Promise.reject(error.response)
})

export default api;
