import React from 'react';
import { Scene, Stack, Modal, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from '../redux/index';

import Login from '@app/view/account/login.js';
import Register from '@app/view/account/register.js';
import Main from '@app/view/main/main.js';

// 招投标
import BulletinHome from '@app/view/bulletin/home.js';
import Bulletin from '@app/view/bulletin/bulletin.js';
import Bidding from '@app/view/bulletin/bidding.js';
import BulletinOther from '@app/view/bulletin/other.js';
import BulletinDetail from '@app/view/bulletin/detail.js';

// 拟建
import Bulledin from '@app/view/bulledin/bulledin.js';

import Mine from '@app/view/mine/mine.js';

import Test from '@app/view/test/test.js';

const router = () => {
    return (
        <Provider store={store}>
            <Router>
                <Modal>
                    <Stack>
                        <Scene
                            title="登录"
                            key="login"
                            component={Login}
                            hideNavBar
                        />
                        <Scene
                            title="注册"
                            key="register"
                            component={Register}
                            hideNavBar
                        />
                        <Scene title="首页" key="home" hideNavBar>
                            <Scene
                                title="招标"
                                key="bulletin"
                                component={Bulletin}
                                hideNavBar
                            />
                            <Scene
                                title="中标"
                                key="bidding"
                                component={Bidding}
                                hideNavBar
                            />
                            <Scene
                                title="其他"
                                key="bulletinOhter"
                                component={BulletinOther}
                                hideNavBar
                            />
                        </Scene>
                        <Scene
                            title="我的"
                            key="mine"
                            component={Mine}
                            hideNavBar
                        />
                        <Scene
                            title="标讯"
                            key="bulletinHome"
                            component={BulletinHome}
                            hideNavBar
                        />
                        <Scene
                            title="标讯详情"
                            key="bulletinDetail"
                            component={BulletinDetail}
                        />
                        <Scene
                            title="拟建"
                            key="bulledin"
                            component={Bulledin}
                            hideNavBar
                        />
                        <Scene
                            title="练习"
                            key="test"
                            component={Test}
                            hideNavBar
                            initial
                        />
                    </Stack>
                </Modal>
            </Router>
        </Provider>
    );
};

export default router;
