import api from './api';

export default {
    getCollectList(params) {
        return api.get(`/v1/api/bulletin_collect/`, {
            params
        });
    }
};
