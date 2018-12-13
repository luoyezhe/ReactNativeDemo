import React, { Component } from 'react';
import { BackHandler } from 'react-native';

import showToast from '@app/component/common/toast.js';
import SplashScreen from '../component/widget/SplashNative';

import { Router, Actions, Scene } from 'react-native-router-flux';

export default function BackUtils() {
    let hasTip = false;
    let ts;
    return function() {
        if (Actions.state.routes[0].index > 0) {
            Actions.pop();
            return true;
        }
        ts = Date.now();
        if (!hasTip) {
            let handler = function() {
                let now = Date.now();
                if (now - ts < 1000) {
                    requestAnimationFrame(handler);
                } else {
                    hasTip = false;
                }
            };
            handler();
            hasTip = true;
            showToast('再点一次退出');
            return true;
        } else {
            //BackHandler.exitApp();
            SplashScreen.exit();
            return true;
        }
    };
}
