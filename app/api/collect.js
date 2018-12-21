import api from './api';

export default {
    getBulletinCollectList(params) {
        return api.get(`/v1/api/bulletin_collect/`, {
            params
        });
    },
    getOrgCollectList(params) {
        return api.get(`/v1/api/org_collect/`, {
            params
        });
    }
};
