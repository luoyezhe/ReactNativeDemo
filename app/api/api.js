import axios from 'axios';
import { BASE_URL } from '@app/config.js';
import storage from '@app/storage/DeviceStorage.js';
import { AsyncStorage } from 'react-native';

const api = axios.create({
    baseURL: BASE_URL
});

async function getToken() {
    await storage.get('token').then(value => {
        console.log('value', value);
        return value;
    });
}

async function interceptors() {
    let token = await storage.get('token');
    api.interceptors.request.use(function(request) {
        console.log('token', token);
        if (token && typeof token === 'string') {
            request.headers.common.Authorization = `Bearer ${token}`;
        }
        console.log('request', request);
        return request;
    });

    api.interceptors.response.use(
        response => {
            console.log(response);
            return response.data.data || response.data;
        },
        error => {
            console.log(error.response);
            // if (error.response && error.response.data.error_code) {
            //
            // }
            return Promise.reject(error.response.data);
        }
    );
}
interceptors();

export default api;
