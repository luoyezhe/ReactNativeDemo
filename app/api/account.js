import api from './api';

const account = {
    login(data) {
        return api.post('/v1/api/user/token/', data);
    },
    register(data) {
        return api.post('/v1/api/user/', data);
    },
    getCaptcha(data) {
        return api.post(`/v1/api/captchas/send/`, data);
    },
    changePassword(data) {
        return api.put('/v1/api/user/update/', data);
    }
};

export default account;
