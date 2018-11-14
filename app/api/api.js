import axios from 'axios';
import Urls from './Urls';
import { BASE_URL } from '@app/config.js';
import { storage } from '@app/storage';

const api = axios.create({
    baseURL: BASE_URL
});

const getToken = async () => {
    let token = null;
    await storage.load('token', data => {
        token = data;
    });
    return token;
};

api.interceptors.request.use(function(request) {
    console.log('request', request);
    const token = getToken();
    if (token) {
        request.headers.common.Authorization = `Bearer ${token}`;
    }
    return request;
});

api.interceptors.response.use(
    function(response) {
        console.log(response);
        return response.data.data || response.data;
    },
    function(error) {
        console.log(error.response);
        // if (error.response && error.response.data.error_code) {
        //
        // }
        return Promise.reject(error.response.data);
    }
);

export default api;
