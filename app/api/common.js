import api from './api';
export default {
    checkVersion() {
        return api.get(`//`);
    }
};
