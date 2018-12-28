import React from 'react';
import { Text } from 'react-native';
import { Scene, Stack, Router, Route } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from '../redux/index';
import { AppStyles } from '../style';

import Login from '@app/view/account/login.js';
import Register from '@app/view/account/register.js';
import Home from '@app/view/home/home.js';

// 易众标
import MainHome from '@app/view/main/home.js';
import BulletinAddSubscription from '@app/view/main/addSubscription.js';
import SearchAddSubscription from '@app/view/main/search.js';
// 招投标
import BulletinHome from '@app/view/bulletin/home.js';
import BulletinDetail from '@app/view/bulletin/detail.js';
import BulletinSearch from '@app/view/bulletin/search.js';
import ManageRule from '@app/view/bulletin/manageRule.js';
import AddRule from '@app/view/bulletin/addRule.js';
// 业绩库
import PerformanceHome from '@app/view/performance/home.js';
import PerformanceDetail from '@app/view/performance/detail.js';
// 我的
import MineHome from '@app/view/mine/home.js';
import AboutPage from '@app/view/mine/aboutPage.js';
// 收藏列表
import CollectList from '@app/view/mine/collect.js';
// 修改密码
import ChangePassword from '@app/view/mine/changePassword.js';
// loading
import LoadingModal from '@app/component/common/LoadingModal';

import Test from '@app/view/test/test.js';
import BackUtils from '@app/utils/backUtils';

const router = () => {
    // headerMode="none"
    return (
        <Provider store={store}>
            <Router hideNavBar={true} backAndroidHandler={BackUtils()}>
                <Stack>
                    <Scene title="登录" key="login" component={Login} />
                    <Scene title="注册" key="register" component={Register} />
                    <Scene
                        key="root"
                        hideNavBar={true}
                        navigationBarStyle={AppStyles.navigationBar}>
                        <Scene
                            key="home"
                            hideNavBar={true}
                            component={Home}
                            tabs>
                            <Scene
                                title="易众标"
                                key="main"
                                component={MainHome}
                                hideNavBar={false}
                            />
                            <Scene
                                title="招投标"
                                key="bulletin"
                                component={BulletinHome}
                                hideNavBar={false}
                                needRightBtn={true}
                                renderRightButton={() => <Text>Right</Text>}
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
                            title="详情"
                            key="bulletinDetail"
                            component={BulletinDetail}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="管理订阅"
                            key="manageRule"
                            component={ManageRule}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="添加订阅词"
                            key="addRule"
                            component={AddRule}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="搜索"
                            key="bulletinSearch"
                            component={BulletinSearch}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="搜索订阅"
                            key="searchSubscription"
                            component={BulletinAddSubscription}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="搜索订阅"
                            key="searchAddSubscription"
                            component={SearchAddSubscription}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="详情"
                            key="performanceDetail"
                            component={PerformanceDetail}
                            hideNavBar={false}
                        />
                        <Scene
                            title="收藏"
                            key="collect"
                            component={CollectList}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="修改密码"
                            key="changePassword"
                            component={ChangePassword}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="关于"
                            key="aboutPage"
                            component={AboutPage}
                            hideNavBar={false}
                            back={true}
                        />
                        <Scene
                            title="练习"
                            key="test"
                            component={Test}
                            hideNavBar
                        />
                    </Scene>
                    <Scene key="LoadingModal" component={LoadingModal} />
                </Stack>
            </Router>
        </Provider>
    );
};

export default router;
