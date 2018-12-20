import * as dict from '@app/constant/common.js';
const translation = (code, dictName, separate = ',') => {
    // console.log('code', code);
    // console.log('dictName', dictName);
    if (!code) {
        return '';
    }
    if (!dictName) {
        return code;
    }
    let msg = '';
    if (Array.isArray(code)) {
        code.forEach(_code => {
            msg += dict[dictName][_code] + separate;
        });
        msg = msg.substr(0, msg.length - 1);
    } else {
        msg = dict[dictName][code];
    }
    return msg;
};

export default translation;
