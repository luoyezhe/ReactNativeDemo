import showToast from '../utils/toast'
import { stringifyParams } from '../utils/Utils';
import Urls from './Urls'
const user = {
		token: ''
}

const Fetch = (url, method, params) => {
		// const header = new Headers({
		// 		'Content-Type': 'application/json'
		// });
		const header = {
				'Content-Type': 'application/json'
		}
		const options = {
				method,
				header
		};
		let toUrl = Urls.host + url;
		if (method === 'get') {
				const strParams = stringifyParams(params);
				if (strParams) {
						toUrl += '?' + strParams;
				}
				delete options.body
		} else {
				options.body = params;
		}
		if (user.token) {
				options.headers["Authorization"] = `Token ${user.token}`
		}
		return fetch(url, options)
				.then(response => {
						return response.json();
				})
				.then(json => {
						showToast(json.message);
						return json;
				})
				.catch(error => {
						showToast('网络错误');
						console.warn(error);
				});
};

export const postFetch = (url, params = {}) => {

		return Fetch(url, 'post', params)

}
export const getFetch = (url, params = {}) => {

		return Fetch(url, 'get', params)
}
export const putFetch = (url, params = {}) => {

		return Fetch(url, 'put', params)
}
export const patchFetch = (url, params = {}) => {

		return Fetch(url, 'patch', params)
}
export const deleteFetch = (url, params = {}) => {

		return Fetch(url, 'delete', params)
}
