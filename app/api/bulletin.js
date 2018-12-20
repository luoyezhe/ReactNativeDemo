import api from './api';

const bulletin = {
    getList(params) {
        return api.get('/v1/api/bulletin/', {
            params: params
        });
    },
    getDetail(id) {
        return api.get(`/v1/api/bulletin/${id}/`);
    },
    bulletinCollect(data) {
        return api.post(`/v1/api/bulletin_collect/`, data);
    },
    bulletinUnCollect(id) {
        return api.delete(`/v1/api/bulletin_collect/${id}/`);
    },
    getHotList() {
        return api.get(`/v1/api/bulletin/`);
    },
    getBulletinContent(id) {
        return api.get(`/v1/api/bulletin/${id}/content/`);
    }
};

export default bulletin;
