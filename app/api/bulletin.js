import api from './api';

const bulletin = {
    getList(params) {
        return api.get('/v1/api/bulletin/', params);
    },
    getDetail(id) {
        return api.get('');
    }
};

export default bulletin;
