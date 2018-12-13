/**
 * toast service
 */
import Toast from 'react-native-root-toast';

const showToast = message => {
    Toast.show(message || '未知错误', {
        duration: 200,
        position: -70,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};

const hideToast = toast => {
    Toast.hide(toast);
};

export default {
    showToast,
    hideToast
};
