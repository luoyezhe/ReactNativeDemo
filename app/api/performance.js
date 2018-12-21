import api from './api';

const performance = {
    getList(params) {
        return api.get('/v1/api/org/hot/', {
            params: params
        });
    },
    getDetail(id) {
        return api.get(`/v1/api/org/${id}/`);
    },
    // 工商信息
    getBusinessInfo(id) {
        return api.get(`/v1/api/org/${id}/information/`);
    },
    // 业绩动态
    getDynamicList({ id, params }) {
        return api.get(`/v1/api/org/${id}/bulletin/`, {
            params: params
        });
    },
    // 企业收藏
    collectOrg(data) {
        return api.post(`/v1/api/org_collect/`, data);
    },
    // 取消企业收藏
    unCollectOrg(id) {
        return api.delete(`/v1/api/org_collect/${id}/`);
    }
};

export default performance;
