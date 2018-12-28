import api from './api';
import qs from 'qs';

export default {
    getList(params) {
        return api.get('/v1/api/bulletin/', {
            params: params,
            paramsSerializer: params => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            }
        });
    },
    getDetail(id) {
        return api.get(`/v1/api/bulletin/${id}/`);
    },
    bulletinCollect(data) {
        return api.post('/v1/api/bulletin_collect/', data);
    },
    bulletinUnCollect(id) {
        return api.delete(`/v1/api/bulletin_collect/${id}/`);
    },
    getHotList() {
        return api.get('/v1/api/bulletin/');
    },
    getBulletinContent(id) {
        return api.get(`/v1/api/bulletin/${id}/content/`);
    },
    addRule(data) {
        return api.post('/v1/api/rule/', data);
    },
    getRules() {
        return api.get('/v1/api/rule/');
    },
    deleteRule(id) {
        return api.delete(`/v1/api/rule/${id}/`);
    }
};
