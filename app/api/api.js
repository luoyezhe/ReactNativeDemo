import axios from 'react-native-axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import { BASE_URL } from '@app/config.js';
import storage from '@app/storage/DeviceStorage.js';

import Toast from '../component/common/toast';

const api = axios.create({
    baseURL: BASE_URL
});

async function getToken() {
    await storage.get('token').then(value => {
        return value;
    });
}

// async function interceptors() {
api.interceptors.request.use(async function(request) {
    let token = await AsyncStorage.getItem('token').then(value => {
        return value;
    });
    console.log('token', token);
    if (token && typeof token === 'string') {
        request.headers.common.Authorization = `Bearer ${token}`;
    }
    console.log('request', request);
    return request;
});

api.interceptors.response.use(
    function(response) {
        return response.data.data || response.data;
    },
    function(error) {
        console.log('error', error.response);
        if (!error.response) {
            let json = { data: { message: '网络连接失败' } };
            return Promise.reject(json);
        }
        if (error.response.status === 401) {
            // let json = { data: { message: '登录过期，请重新登录' } };
            // return Promise.reject(json);
            Toast.showToast('登录过期，请重新登录');
            Actions.reset('login');
            return;
        } else if (error.response.status === 500) {
            let json = { data: { message: '服务器错误' } };
            return Promise.reject(json);
        }
        return Promise.reject(error.response.data);
    }
);

export default api;
