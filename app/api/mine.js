import api from './api';

export default {
    getUserInfo() {
        return api.get(`/v1/api/user/me/`);
    },
    uploadImage(data) {
        return api.post(`/v1/api/user/upload_image/`, data);
    }
};
