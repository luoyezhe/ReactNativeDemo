import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from '../redux/index';
import { AppStyles } from '../style';

import Login from '@app/view/account/login.js';
import Register from '@app/view/account/register.js';
import Home from '@app/view/home/home.js';

// 易众标
import MainHome from '@app/view/main/home.js';
// 招投标
import BulletinHome from '@app/view/bulletin/home.js';
// 业绩库
import PerformanceHome from '@app/view/performance/home.js';
// 我的
import MineHome from '@app/view/mine/home.js';
// 收藏列表
import CollectList from '@app/view/mine/collect.js';
// 修改密码
import ChangePassword from '@app/view/mine/changePassword.js';

import Test from '@app/view/test/test.js';

const router = () => {
    return (
        <Provider store={store}>
            <Router>
                <Stack>
                    <Scene title="登录" key="login" component={Login} />
                    <Scene title="注册" key="register" component={Register} />
                    <Scene
                        key="root"
                        navigationBarStyle={AppStyles.navigationBar}>
                        <Scene
                            title="首页"
                            key="home"
                            hideNavBar
                            component={Home}>
                            <Scene
                                title="易众标"
                                key="main"
                                component={MainHome}
                                hideNavBar
                            />
                            <Scene
                                title="招投标"
                                key="bulletin"
                                component={BulletinHome}
                                hideNavBar
                            />
                            <Scene
                                title="业绩库"
                                key="performance"
                                component={PerformanceHome}
                                hideNavBar
                            />
                            <Scene
                                title="我的"
                                key="mine"
                                component={MineHome}
                                hideNavBar
                            />
                        </Scene>
                        <Scene
                            title="收藏"
                            key="collect"
                            component={CollectList}
                            back={true}
                        />
                        <Scene
                            title="修改密码"
                            key="changePassword"
                            component={ChangePassword}
                            back={true}
                        />
                        <Scene
                            title="练习"
                            key="test"
                            component={Test}
                            hideNavBar
                        />
                    </Scene>
                </Stack>
            </Router>
        </Provider>
    );
};

export default router;
