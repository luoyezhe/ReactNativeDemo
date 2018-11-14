import api from './api';

const account = {
    login(data) {
        return api.post('/v1/api/user/token/', data);
    }
};

export default account;
