const utils = {
    checkPhone(val) {
        const reg = /^1\d{10}$/;
        return reg.test(val);
    },
    // 密码必须包含大小写字母和数字,8-20位
    checkPass(val) {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,20}$/;
        return reg.test(val);
    },
    dataURLtoBlob(dataurl) {
        let arr = dataurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1].replace(/\s/g, ''));
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime }); // 值，类型
    },
    testTimeStr2(str) {
        const dateReg = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
        const dateReg2 = /[0-9]{4}-[0-9]{2}/;
        // console.log(dateReg.test(str))
        return dateReg.test(str) || dateReg2.test(str);
    }
};

export default utils;
