import { Platform, Linking } from 'react-native';
import VersionNumber from 'react-native-version-number';
import { Actions } from 'react-native-router-flux';

import Toast from '@app/component/common/toast';
import api from '../api/common';

export const getNewsVersion = (showTip, onlyCheck = true) => {
    //ios不检查更新
    if (Platform.OS === 'ios' && onlyCheck) {
        return;
    }
    api.checkVersion().then(res => {
        if (res && res.result) {
            let versionName = res.data[0].name;
            if (__DEV__) {
                console.log('service versionName ', versionName);
            }
            if (versionName) {
                let versionNameNum = parseFloat(versionName);
                let currentNum = parseFloat(VersionNumber.appVersion);
                let newsHad = versionNameNum > currentNum;
                if (__DEV__) {
                    console.log('service versionNameNum ', versionNameNum);
                    console.log('local currentNum ', currentNum);
                    console.log('version update newsHad ', newsHad);
                }
                if (newsHad) {
                    let downloadUrl = '';
                    Actions.ConfirmModal({
                        titleText: '更新',
                        text: '确认更新该版本吗？',
                        textConfirm: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL(
                                    downloadUrl
                                );
                            } else {
                                Linking.openURL(downloadUrl);
                            }
                        }
                    });
                } else {
                    if (showTip) {
                        Toast.showToast('当前已是最新版本');
                    }
                }
            }
        }
    });
};
