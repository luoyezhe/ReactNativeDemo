import showToast from '../utils/toast';
import { stringifyParams } from '../utils/Utils';
import Urls from './Urls';
import storage from '@app/storage/DeviceStorage.js';
import { BASE_URL } from '@app/config.js';

const user = {
    token: ''
};

const Fetch = async (url, method, params) => {
    // const header = new Headers({
    // 		'Content-Type': 'application/json'
    // });
    let token = await storage.get('token');
    console.log('token', token);
    const header = {
        'Content-Type': 'application/json'
    };
    if (token) {
        header['common'] = {
            Authorization: `Bearer ${token}`
        };
    }
    console.log('header', header);
    const options = {
        method,
        header
    };
    let toUrl = BASE_URL + url;
    if (method === 'get') {
        const strParams = stringifyParams(params);
        if (strParams) {
            toUrl += '?' + strParams;
        }
        delete options.body;
    } else {
        options.body = params;
    }
    // if (user.token) {
    //     options.headers.Authorization = `Token ${user.token}`;
    // }
    console.log(toUrl);
    console.log(options);
    return fetch(toUrl, options)
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
    return Fetch(url, 'post', params);
};
export const getFetch = (url, params = {}) => {
    return Fetch(url, 'get', params);
};
export const putFetch = (url, params = {}) => {
    return Fetch(url, 'put', params);
};
export const patchFetch = (url, params = {}) => {
    return Fetch(url, 'patch', params);
};
export const deleteFetch = (url, params = {}) => {
    return Fetch(url, 'delete', params);
};
